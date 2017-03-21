import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(){
    let controller = this.controllerFor("account");
    if(controller.get('session.isAuthenticated')){
      controller.get("navigation").setPage("account");
    }else{
      controller.transitionToRoute("login");
    }
  },
  model: function(){
    let controller = this.controllerFor("account");
    return this.store.find("user", controller.get('session.session.authenticated.user')).then(function (user) {
      controller.set("currentEmail", user.get("email"))
      return user;
    });
  },
  setupController: function(controller, model){
    controller.set("model", model);
  }
});
