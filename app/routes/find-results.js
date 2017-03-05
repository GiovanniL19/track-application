import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params){
    let controller = this.controllerFor("find-results");

    return controller.store.query("train", {
      origin: params.originCRS,
      destination: params.destinationCRS,
      rows: "10",
      lng: controller.get("location.longitude"),
      lat: controller.get("location.latitude"),
      user: controller.get("application.user.id")
    }).then(function (trains) {
      controller.set("navigation.isLoading", false);

      //Get message
      controller.get("stationMessage").getMessage(params.originCRS);

      return trains;
    }, function (error) {
      controller.set("navigation.isLoading", false);
      if (error.errors === undefined) {
        console.log(error.message);
      } else {
        controller.set("alert.message", error.errors[0].detail);
        controller.transitionToRoute("find");
      }
    });
  }
});
