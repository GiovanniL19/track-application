import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'user'}),
  dateCreated: DS.attr("number"),

  //Basic information
  firstName: DS.attr("string"),
  lastName: DS.attr("string"),
  email: DS.attr("string"),
  image: DS.attr("string"),

  //Login details
  username: DS.attr("string"),
  password: DS.attr("string"),
  lastLogin: DS.attr("number"),

  //History
  toStations: MF.fragmentArray("station", {async: true, defaultValue: []}),
  fromStations: MF.fragmentArray("station", {async: true, defaultValue: []}),

  //Routes
  starredJourneys: DS.hasMany("journey", {async: true, defaultValue: [], inverse: "starred"}),
  journeyHistory: DS.hasMany("journey", {async: true, defaultValue: [], inverse: "history"}),

  fullName: function(){
    return this.get("firstName") + " " + this.get("lastName");
  }.property("firstName", "lastName")
});
