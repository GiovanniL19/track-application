import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.get("navigation").setPage("board");
    if(!controller.get("station")){
      controller.set("stationMessage.crs", "");
      controller.set("stationMessage.message", "");
    }
    this.store.findAll("station").then(function(stations){
      controller.set("stations", stations);
    });
  }
});
