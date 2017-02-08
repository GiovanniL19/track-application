import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.set('navigation.page',{
      find: false,
      board: true,
      likes: false,
      account: false
    });
  }
});
