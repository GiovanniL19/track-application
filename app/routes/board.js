import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.set('navigation.page',{
      find: false,
      board: true,
      likes: false,
      account: false,
      accountAccess: {
        login: false,
        register: false
      }
    });

    this.store.findAll("station").then(function(stations){
      controller.set("stations", stations);
    });
  }
});
