import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'navigation',
  beforeModel: function(){
    let controller = this.controllerFor("navigation");
    controller.get('geolocation').getLocation().then(function(geo) {
      controller.set("location.longitude", geo.coords.longitude);
      controller.set("location.latitude", geo.coords.latitude);
      console.log("Location is:" + controller.get("location.longitude") + ", " + controller.get("location.latitude"));
    });
  },
  setupController: function(controller){

    if(controller.get("session.isAuthenticated")){
      //Get user
      this.store.find("user", controller.get('session.session.authenticated.user')).then(function(user){
        controller.set("user", user);
      });
    }


    try{
      if (cordova.platformId === 'android') {
        StatusBar.backgroundColorByHexString("#304355");
      }
    }catch(e){
      console.log(e);
    }

    if(this.get('router.url') === "/"){
      controller.transitionToRoute("find");
    }
  }
});
