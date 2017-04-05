import DS from 'ember-data';
import MF from 'ember-data-model-fragments';

const {
  attr,
  belongsTo
} = DS;

const {
  fragment,
} = MF;

export default DS.Model.extend({
  type: attr("string", {defaultValue: 'journey'}),
  starred: belongsTo("user", {async: true, inverse: "starredJourneys"}),
  history: belongsTo("user", {async: true, inverse: "journeyHistory"}),

  to: fragment('station-fragment'),
  from: fragment('station-fragment'),
  user: belongsTo("user", {async: true}),
  count: attr("number", {defaultValue: 0}),
  hour: attr("number"),

  hourFormatted: function(){
    if(this.get("hour") < 10){
      if(this.get("hour") < 12) {
        return "0" + this.get("hour") + ":00AM";
      }else{
        return this.get("hour") + ":00AM";
      }
    }else{
      if(this.get("hour") < 12) {
        return this.get("hour") + ":00AM";
      }else{
        return this.get("hour") + ":00PM";
      }
    }
  }.property("hour")
});
