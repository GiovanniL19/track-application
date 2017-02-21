import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.set('navigation.page',{
      find: false,
      board: false,
      likes: false,
      account: false,
      accountAccess: {
        login: false,
        register: true
      }
    });
  },

  deactivate: function(){
    let controller = this.controllerFor("register");
    controller.clearInput();
  }
});
