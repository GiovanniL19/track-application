import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    let controller = this.controllerFor("results");

    return this.store.query("train", {origin: controller.get("origin"),destination: controller.get("destination"), rows: "10"}).then(function(trains){
      return trains;
    });
  }
});
