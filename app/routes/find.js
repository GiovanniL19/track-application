import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.get("navigation").setPage("find");

    this.store.findAll("station").then(function(stations){
      controller.set("stations", stations);
    });
  },
  actions: {
    willTransition(transition) {
      if(transition.targetName === "index") {
        transition.abort();
      }
    }
  }
});
