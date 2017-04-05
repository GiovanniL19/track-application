import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    let that = this.controllerFor("find");
    that.getRecommendedJourneys();
    controller.get("location").getLocation();

    if (this.get('router.url') === "/") {
      controller.transitionToRoute("find");
    }

    if (controller.get("session.isAuthenticated")) {
      //Get user
      this.store.find("user", controller.get('session.session.authenticated.user')).then(function (user) {
        controller.set("user", user);
      });
    }

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      try {
        if (cordova.platformId === 'android') {
          StatusBar.backgroundColorByHexString("#304355");
          controller.get("location").getLocation();
        }
      } catch (ignored) {}
    }
  }

});
