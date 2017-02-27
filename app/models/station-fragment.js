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

  isDelayed: function(){
    if(this.get("et") === "On time"){
      return false;
    }else{
      return true;
    }
  }.property("et"),

  delayedTime: function(){
    if(this.get("et") === "Delayed"){
      return "Awaiting";
    }else{
      return this.get("et");
    }
  }.property("et"),
});
