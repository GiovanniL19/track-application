import Ember from 'ember';

export default Ember.Service.extend({
  dateSelected: "Today, now",

  dateChange: function(){
    this.set("dateSelected", moment.unix(this.get("dateTime")).format("DD/MMM, HH:mm"));
  }.observes("dateTime")
});
