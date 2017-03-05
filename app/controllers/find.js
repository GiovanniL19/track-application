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
  dateTime: null,

  actions: {
    swapStations(){
      //Swaps station inputs
      let to = this.get("location.toStation");
      let from = this.get("location.fromStation");

      this.set("location.toStation", from);
      this.set("location.fromStation", to);
    },

    getNearbyStations(){
      this.set("application.getNearbyStations", !this.get("application.getNearbyStations"));
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
