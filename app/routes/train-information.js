import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    if(!controller.get("train.details")){
      controller.transitionToRoute("find");
    }
  }
});
