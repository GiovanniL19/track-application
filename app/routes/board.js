import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.get("navigation").setPage("board");

    this.store.findAll("station").then(function(stations){
      controller.set("stations", stations);
    });
  }
});
