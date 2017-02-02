import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  fromStation: "",
  toStation: "",
  dateTime: null,
  dateSelected: "Today, now",

  dateChange: function(){
    this.set("dateSelected", moment.unix(this.get("dateTime")).format("DD/MMM, HH:mm"));
  }.observes("dateTime"),

  actions: {
    showDateTimeSelect: function(){
      Ember.$('#timeDateSelect').modal();
    }
  }
});
