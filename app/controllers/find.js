  import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  findResults: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  geolocation: Ember.inject.service(),

  stations: [],
  showResults: true,
  fromStation: "",
  toStation: "",
  dateTime: null,
  dateSelected: "Today, now",

  dateChange: function(){
    this.set("dateSelected", moment.unix(this.get("dateTime")).format("DD/MMM, HH:mm"));
  }.observes("dateTime"),

  actions: {
    getNearestStation: function(){
      let controller = this;
      this.set("navigation.loadingNearbyStations", true);
      Ember.$('#stationSelect').modal();
      this.store.query("station", {lng: this.get("navigation.location.longitude"), lat: this.get("navigation.location.latitude")}).then(function(stations){
        controller.set("navigation.nearbyStations", stations);
        controller.set("navigation.loadingNearbyStations", false);
      });
    },
    showDateTimeSelect: function(){
      this.set("navigation.date", moment(Date.now())).format("DD/MM/YYYY");
      Ember.$('#timeDateSelect').modal();
    },
    getTrains: function(){
      let controller = this;
      if(this.get("fromStation") && this.get("toStation")){
        if(this.get('fromStation') !== this.get("toStation")){
          controller.set("navigation.isLoading", true);
          var from = "";
          var to = "";

          this.get("stations").forEach(function (station) {
            if (station.get("name") === controller.get("fromStation")) {
              from = station;
            }

            if (station.get("name") === controller.get("toStation")) {
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
          this.set("navigation.message", "From and to stations must be valid");
        }
      }else{
        this.set("navigation.message", "Please ensure you have a to and from station");
      }
    }
  }
});
