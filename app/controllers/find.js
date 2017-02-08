import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  fromStation: "",
  toStation: "",
  dateTime: null,
  dateSelected: "Today, now",

  dateChange: function(){
    this.set("dateSelected", moment.unix(this.get("dateTime")).format("DD/MMM, HH:mm"));
  }.observes("dateTime"),

  actions: {
    showDateTimeSelect: function(){
      this.set("navigation.date", moment(Date.now())).format("DD/MM/YYYY");
      Ember.$('#timeDateSelect').modal();
    }
  }
});
