import Ember from 'ember';

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
  journeyLikedID: "",

  getRecommendedJourneys: function(){
    let controller = this;
    controller.set("loadingJourneys", true);
    this.set("recommendedJourneys", []);

    if(this.get("location.longitude") && this.get("location.latitude")){
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
    this.set("journeyLikedID", "");

    if(this.get("location.fromStation") && this.get("location.toStation")) {
      if (this.get('location.fromStation') !== this.get("location.toStation")) {
        //Check if email exists
        Ember.$.ajax({
          url: 'http://localhost:3002/journeys/check/' + this.get("location.fromStation") + '/' + this.get("location.toStation") + '/' + this.get("application.user.id"),
          type: 'GET',
          headers: {
            Accept : "application/json"
          },
          success: function(data) {
            if(data.found){
              controller.set("journeyLiked", true);
              controller.set("journeyLikedID", data.id);
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

      if(this.get("journeyLikedID")) {
        this.store.find("journey", this.get("journeyLikedID")).then(function (journey) {
          controller.store.find("user", controller.get("application.user.id")).then(function (user) {
            user.get("starredJourneys").removeObject(journey);
            user.save().then(function () {
              journey.destroyRecord().then(function () {
                controller.set("journeyLiked", false);
              });
            });
          });
        });
      }
    },

    likeJourney(){
      let controller = this;
      var to = null;
      var from = null;

      if(this.get("location.fromStation") && this.get("location.toStation")) {
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
          var toStation = this.store.createFragment("station-fragment", {
            name: to.get("name"),
            crs: to.get("crs")
          });

          var fromStation = this.store.createFragment("station-fragment", {
            name: from.get("name"),
            crs: from.get("crs")
          });

          journey.set("to", toStation);
          journey.set("from", fromStation);
          journey.set("starred", controller.get("application.user"));

          journey.save().then(function (savedJourney) {
            controller.set("journeyLiked", true);
            controller.set("journeyLikedID", savedJourney.get("id"));
            controller.get("application.user.starredJourneys").pushObject(savedJourney);
            controller.get("application.user").save();
          });
        }else{
          controller.set("alert.message", "Stations can not be the same");
        }
      }else{
        controller.set("alert.message", "Please enter from and to stations");
      }
    },

    swapStations(){
      //Swaps station inputs
      let to = this.get("location.toStation");
      let from = this.get("location.fromStation");

      this.set("location.toStation", from);
      this.set("location.fromStation", to);
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
            }

            if (station.get("name") === controller.get("location.toStation")) {
              to = station;
            }
          });

          controller.transitionToRoute("find-results", {queryParams: {
              origin: from.get("name"),
              destination: to.get("name"),
              originCRS: from.get("crs"),
              destinationCRS: to.get("crs")
            }
          });
        }else{
          this.set("alert.message", "From and to stations must be valid");
        }
      }else{
        this.set("alert.message", "Please ensure you have a to and from station");
      }
    }
  }
});
