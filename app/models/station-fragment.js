import DS from 'ember-data';
import MF from 'model-fragments';

const {
  attr
} = DS;

export default MF.Fragment.extend({
  name: attr("string"),
  crs: attr("string"),
  et: attr("string"),
  st: attr("string"),
  at: attr("string"),

  isPreviousCallingPoint: function(){
    if(this.get("at")){
     return true;
    }else{
      return false;
    }
  }.property("at"),

  isDelayed: function(){
    if(this.get("at")) {
      if (this.get("at") === "On time") {
        return false;
      } else {
        return true;
      }
    }else{
      if (this.get("et") === "On time") {
        return false;
      } else {
        return true;
      }
    }
  }.property("at", "et"),

  delayedTime: function(){
    if(this.get("at")) {
      if (this.get("at") === "Delayed") {
        return "Awaiting";
      } else {
        if (this.get("at")) {
          return this.get("at");
        } else {
          return "Delayed";
        }
      }
    }else{
      if (this.get("et") === "Delayed") {
        return "Awaiting";
      } else {
        if (this.get("et")) {
          return this.get("et");
        } else {
          return "Delayed";
        }
      }
    }
  }.property("at", "et"),
});
