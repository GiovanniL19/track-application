import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  trainInformation: Ember.inject.controller(),
  origin: null,
  destination: null,

  actions:{
    back: function(){
      history.back();
    },
    selectTrain: function(train){
      this.set("trainInformation.train", train);
      this.transitionToRoute("train-information");
    }
  }
});
