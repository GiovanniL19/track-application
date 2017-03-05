import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    //TODO: Get user and return
    return null;
  },
  setupController: function(controller, model){
    if(controller.get('session.isAuthenticated')){
      controller.set("model", model);
      controller.get("navigation").setPage("account");
    }else{
      controller.transitionToRoute("login");
    }
  }
});
