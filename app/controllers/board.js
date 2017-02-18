import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  stationInput: null,
  station: null,
  type: "Departure",
  actions:{
    showStationMessage: function(){
      Ember.$('#stationMessage').modal();
    },
    selectType: function(value){
      this.set("type", value);
    }
  }
});
