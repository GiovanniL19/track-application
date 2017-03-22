import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  alert: Ember.inject.service("alert-message"),
  dateTimeSelect: Ember.inject.service(),
  navigation: Ember.inject.service(),
  location: Ember.inject.service(),

  application: Ember.inject.controller(),
  findResults: Ember.inject.controller(),

  stations: [],
  recommendedJourneys:[],
  dateTime: null,
  loadingJourneys: true,

  recommendedJourneys: function(){
    let controller = this;
    controller.set("loadingJourneys", true);
    if(this.get("location.longitude") && this.get("location.latitude")){
      this.store.query("journey", {longitude: controller.get("location.longitude"), latitude: controller.get("location.latitude"), user: controller.get("session.session.authenticated.user")}).then(function(journeys){
        controller.set("loadingJourneys", false);
        controller.set("recommendedJourneys", journeys);
      });
    }
  }.observes("location.longitude", "location.latitude", "application.user"),

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
    likeJourney: function(){
      let controller = this;
      var to = null;
      var from = null;

      this.get("stations").forEach(function (station) {
        if (station.get("name") === controller.get("location.fromStation")) {
          from = station;
        }

        if (station.get("name") === controller.get("location.toStation")) {
          to = station;
        }
      });

      var journey = this.store.createRecord("journey");
      var toStation = this.store.createFragment("station-fragment",{
        name: to.get("name"),
        crs: to.get("crs")
      });

      var fromStation = this.store.createFragment("station-fragment",{
        name: from.get("name"),
        crs: from.get("crs")
      });

      journey.set("to", toStation);
      journey.set("from", fromStation);
      journey.set("starred", controller.get("application.user"));

      journey.save().then(function(savedJourney){
        controller.get("application.user.starredJourneys").pushObject(savedJourney);
        controller.get("application.user").save();
      });
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

    showDateTimeSelect: function(){
      //Shows date modal
      Ember.$('#timeDateSelect').modal();
    },

    getTrains: function(){
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
