import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  session: Ember.inject.service('session'),

  actions:{
    invalidate: function(){
      this.get('session').invalidate();
      this.set("navigation.user",null);
      this.transitionToRoute("find");
    }
  }
});
