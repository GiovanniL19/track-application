import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.set('navigation.page',{
      find: true,
      board: false,
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
