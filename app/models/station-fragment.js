import DS from 'ember-data';
import MF from 'model-fragments';

export default MF.Fragment.extend({
  name: DS.attr("string"),
  crs: DS.attr("string"),
  et: DS.attr("string"),
  st: DS.attr("string"),

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
