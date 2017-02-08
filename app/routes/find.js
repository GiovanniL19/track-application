import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller){
    controller.set('navigation.page',{
      find: true,
      board: false,
      likes: false,
      account: false
    });
  }
});
