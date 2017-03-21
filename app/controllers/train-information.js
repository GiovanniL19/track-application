import Ember from 'ember';

export default Ember.Controller.extend({
  train: Ember.inject.service(),
  actions:{
    back(){
      history.back();
    }
  }
});
