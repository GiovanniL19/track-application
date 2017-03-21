import DS from 'ember-data';
import MF from 'model-fragments';


const {
  attr,
  hasMany
} = DS;

const {
  fragmentArray,
} = MF;

export default DS.Model.extend({
  rev: attr("string"),
  type: attr("string", {defaultValue: 'user'}),
  dateCreated: attr("number"),

  //Basic information
  firstName: attr("string"),
  lastName: attr("string"),
  email: attr("string"),
  image: attr("string"),

  //Login details
  username: attr("string"),
  password: attr("string"),
  lastLogin: attr("number"),

  //History
  toStations: fragmentArray("station", {async: true, defaultValue: []}),
  fromStations: fragmentArray("station", {async: true, defaultValue: []}),

  //Journeys
  starredJourneys: hasMany("journey", {async: true, defaultValue: [], inverse: "starred"}),
  journeyHistory: hasMany("journey", {async: true, defaultValue: [], inverse: "history"}),

  fullName: function(){
    return this.get("firstName") + " " + this.get("lastName");
  }.property("firstName", "lastName")
});
