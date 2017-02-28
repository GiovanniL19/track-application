import Ember from 'ember';

export default Ember.Controller.extend({
  train: null,

  actions:{
    back: function(){
      history.back();
    }
  }
});
