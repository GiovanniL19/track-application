import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.service(),
  session: Ember.inject.service('session'),

  actions:{
    invalidate(){
      this.get('session').invalidate();
      this.set("navigation.user",null);
      this.transitionToRoute("find");
    }
  }
});
