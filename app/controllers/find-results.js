import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  trainInformation: Ember.inject.controller(),

  queryParams: ['origin', 'destination', 'originCRS', 'destinationCRS'],
  origin: "",
  destination: "",
  originCRS: "",
  destinationCRS: "",

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
