import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller) {
    controller.get("navigation").setPage("accountAccess.register");
  },

  deactivate: function(){
    let controller = this.controllerFor("register");
    controller.clearInput();
  }
});
