import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'navigation',
  setupController: function(controller){
    try{
      if (cordova.platformId === 'android') {
        StatusBar.backgroundColorByHexString("#304355");
      }
    }catch(e){
      console.log(e);
    }
    controller.transitionToRoute("find");
  }
});
