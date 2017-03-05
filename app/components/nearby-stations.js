import Ember from 'ember';

export default Ember.Component.extend({
  location: Ember.inject.service(),
  store: Ember.inject.service(),

  nearbyStations: [],
  loadingNearbyStations: true,
  toggle: false,

  getStations: function(){
    //Makes request to get nearest stations
    let controller = this;
    this.set("loadingNearbyStations", true);
    if(this.get("location.longitude") !== null && this.get("location.latitude") !== null){
      this.get("store").query("station", {
        lng: this.get("location.longitude"),
        lat: this.get("location.latitude")
      }).then(function (stations) {
        controller.set("nearbyStations", stations);
        controller.set("loadingNearbyStations", false);
      });
    }
  }.observes("toggle", "location.longitude", "location.latitude"),

  actions: {
    selectStation(station){
      Ember.$("#stationSelect").modal("hide");
      this.set("location.fromStation", station.get("name"));
      this.set("location.showResults", false);
    }
  }
});
