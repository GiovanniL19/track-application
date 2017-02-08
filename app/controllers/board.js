import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  station: "",
  type: "Departure",
  actions:{
    selectType: function(value){
      this.set("type", value);
    }
  }
});
