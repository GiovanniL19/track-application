import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    let controller = this.controllerFor("find-results");
    return controller.store.query("train", {
      origin: controller.get("origin.crs"),
      destination: controller.get("destination.crs"),
      rows: "10",
      lng: controller.get("navigation.location.longitude"),
      lat: controller.get("navigation.location.latitude"),
      user: controller.get("navigation.user.id")
    }).then(function (trains) {
      controller.set("navigation.isLoading", false);
      return trains;
    }, function (error) {
      controller.set("navigation.isLoading", false);
      if (error.errors === undefined) {
        console.log(error.message);
      } else {
        controller.set("navigation.message", error.errors[0].detail);
        controller.transitionToRoute("find");
      }
    });
  }
});
