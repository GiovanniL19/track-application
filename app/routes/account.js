import Ember from 'ember';

export default Ember.Route.extend({
  model: function(){
    //TODO: Get user and return
    return null
  },
  setupController: function(controller, model){
    controller.set("model", model);
    controller.set('navigation.page',{
      find: false,
      board: false,
      likes: false,
      account: true
    });
  }
});
