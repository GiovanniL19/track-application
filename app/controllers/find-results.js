import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.service(),
  location: Ember.inject.service(),
  stationMessage: Ember.inject.service(),
  alert: Ember.inject.service('alert-message'),

  application: Ember.inject.controller(),
  find: Ember.inject.controller(),

  queryParams: ['origin', 'destination', 'originCRS', 'destinationCRS'],
  origin: "",
  destination: "",
  originCRS: "",
  destinationCRS: "",

  actions:{
    back(){
      //Go back
      history.back();
    },

    showStationMessage(){
      //Opens modal
      Ember.$('#stationMessage').modal();
    },
  }
});
