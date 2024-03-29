import Ember from 'ember';
import ENV from 'track-application/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  alert: Ember.inject.service("alert-message"),
  navigation: Ember.inject.service(),
  dateTimeSelect: Ember.inject.service(),
  location: Ember.inject.service(),

  application: Ember.inject.controller(),
  findResults: Ember.inject.controller(),

  stations: [],
  recommendedJourneys:[],
  dateTime: null,
  loadingJourneys: true,
  journeyLiked: false,
  likedJourney: null,
  loadingLike: false,

  from: "",
  to: "",

  getRecommendedJourneys: function(){
    let controller = this;
    controller.set("loadingJourneys", true);
    this.set("recommendedJourneys", []);

    if(this.get("location.longitude") && this.get("location.latitude") && this.get("session.isAuthenticated")){
      this.store.query("journey", {longitude: controller.get("location.longitude"), latitude: controller.get("location.latitude"), user: controller.get("session.session.authenticated.user")}).then(function(journeys){
        controller.set("loadingJourneys", false);
        controller.set("recommendedJourneys", journeys);
      }, function(error){
        controller.set("loadingJourneys", false);
        console.log(error);
      });
    }
  },

  locationReady: function(){
    this.getRecommendedJourneys();
  }.observes("location.done"),

  userReady: function(){
    this.getRecommendedJourneys();
  }.observes("application.user"),

  checkLikedJourney: function(){
    let controller = this;
    this.set("journeyLiked", false);
    this.set("likedJourney", null);

    if(this.get("location.fromStation") && this.get("location.toStation") && this.get("session.isAuthenticated")) {
      if (this.get('location.fromStation') !== this.get("location.toStation")) {
        //Check if email exists
        Ember.$.ajax({
          url: ENV.hostURL + '/journeys/check/' + this.get("location.fromStation") + '/' + this.get("location.toStation") + '/' + this.get("application.user.id"),
          type: 'GET',
          headers: {
            Accept : "application/json"
          },
          success: function(data) {
            if(data.found){
              controller.set("journeyLiked", true);
              controller.set("likedJourney", data);
            }else {
              controller.set("journeyLiked", false);
            }
          },
          error: function(err) {
            console.log(err);
            controller.set("alert.message", "There was an error checking liked journey");
          }
        });
      }
    }
  }.observes("location.fromStation", "location.toStation"),

  actions: {
    findTrains(journey){
      this.transitionToRoute("find-results", {
        queryParams: {
          origin: journey.get("from.name"),
          destination: journey.get("to.name"),
          originCRS: journey.get("from.crs"),
          destinationCRS: journey.get("to.crs")
        }
      });
    },

    unlikeJourney(){
      let controller = this;
      if(this.get("loadingLike") === false) {
        this.set("loadingLike", true);
        if(this.get("likedJourney")) {
          let currentLikedJourney = this.get("likedJourney");
          this.store.findRecord("journey", currentLikedJourney.id, {reload: true}).then(function(journey){
            controller.store.find("user", controller.get("application.user.id")).then(function (user) {
              user.get("starredJourneys").removeObject(journey);
              user.save().then(function () {
                journey.destroyRecord().then(function () {
                  controller.set("journeyLiked", false);
                  controller.set("loadingLike", false);
                });
              });
            });
          });
        }
      }
    },

    likeJourney(){
      if(this.get("loadingLike") === false) {
        this.set("loadingLike", true);
        let controller = this;
        var to = null;
        var from = null;

        if (this.get("location.fromStation") && this.get("location.toStation")) {
          if (this.get('location.fromStation') !== this.get("location.toStation")) {
            this.get("stations").forEach(function (station) {
              if (station.get("name") === controller.get("location.fromStation")) {
                from = station;
              }

              if (station.get("name") === controller.get("location.toStation")) {
                to = station;
              }
            });

            var journey = this.store.createRecord("journey");

            var toName = to.get("name").substring(0, 1).toUpperCase() + to.get("name").substring(1).toLowerCase();
            var toStation = this.store.createFragment("station-fragment", {
              name: toName,
              crs: to.get("crs")
            });

            var fromName = from.get("name").substring(0, 1).toUpperCase() + from.get("name").substring(1).toLowerCase();
            var fromStation = this.store.createFragment("station-fragment", {
              name: fromName,
              crs: from.get("crs")
            });

            journey.set("type", "liked");
            journey.set("to", toStation);
            journey.set("from", fromStation);
            journey.set("starred", controller.get("application.user"));

            journey.save().then(function (savedJourney) {
              controller.set("journeyLiked", true);
              controller.set("likedJourney", savedJourney);
              controller.get("application.user.starredJourneys").pushObject(savedJourney);
              controller.get("application.user").save().then(function () {
                controller.set("loadingLike", false);
              });
            });
          } else {
            controller.set("loadingLike", false);
            controller.set("alert.message", "Stations can not be the same");
          }
        } else {
          this.set("loadingLike", false);
          controller.set("alert.message", "Please enter from and to stations");
        }
      }
    },

    swapStations(){
      //Swaps station inputs
      let to = this.get("location.toStation");
      let from = this.get("location.fromStation");

      this.set("location.toStation", from);
      this.set("location.fromStation", to);

      let toValue = this.get("to");
      let fromValue = this.get("from");

      this.set("to", fromValue);
      this.set("from", toValue);
    },

    getNearbyStations(){
      this.set("application.nearbyStationsToggle", !this.get("application.nearbyStationsToggle"));
      Ember.$('#stationSelect').modal();
    },

    showDateTimeSelect(){
      //Shows date modal
      Ember.$('#timeDateSelect').modal();
    },

    getTrains(){
      let controller = this;
      if(this.get("location.fromStation") && this.get("location.toStation")){
        if(this.get('location.fromStation') !== this.get("location.toStation")){
          controller.set("navigation.isLoading", true);
          var from = "";
          var to = "";

          this.get("stations").forEach(function (station) {
            if (station.get("name") === controller.get("location.fromStation")) {
              from = station;
            }else if(controller.get("from").toLowerCase() === station.get("name").toLowerCase()){
              from = station;
            }else if(controller.get("from").toLowerCase() === station.get("crs").toLowerCase()){
              from = station;
            }

            if (station.get("name") === controller.get("location.toStation")) {
              to = station;
            }else if(controller.get("to").toLowerCase() === station.get("name").toLowerCase()){
              to = station;
            }else if(controller.get("to").toLowerCase() === station.get("crs").toLowerCase()){
              to = station;
            }
          });

          if(from !== "" && to !== "") {
            controller.transitionToRoute("find-results", {
              queryParams: {
                origin: from.get("name"),
                destination: to.get("name"),
                originCRS: from.get("crs"),
                destinationCRS: to.get("crs")
              }
            });
          }else{
            this.set("alert.message", "Invalid Stations");
            controller.set("navigation.isLoading", false);
          }
        }else{
          controller.set("navigation.isLoading", false);
          this.set("alert.message", "From and to stations must be valid");
        }
      }else{
        controller.set("navigation.isLoading", false);
        this.set("alert.message", "Please ensure you have a to and from station");
      }
    }
  }
});
