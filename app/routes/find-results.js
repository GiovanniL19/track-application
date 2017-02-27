import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    let controller = this.controllerFor("find-results");

    return this.store.query("train", {origin: controller.get("origin.crs"),destination: controller.get("destination.crs"), rows: "10"}).then(function(trains){
      return trains;
    }, function(error){
      if(error.errors === undefined){
        console.log(error.message);
      }else{
        controller.set("navigation.message", error.errors[0].detail);
        controller.transitionToRoute("find");
      }
    });
  }
});
