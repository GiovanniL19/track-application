import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
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
        }
      } catch (ignored) {}
      controller.get("location").getLocation();
    }
  }

});
