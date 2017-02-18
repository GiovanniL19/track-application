import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'train'}),
  callingPoints: MF.fragmentArray("station-fragment"),
  std: DS.attr("string"),
  arrivalStatus: DS.attr("string"),
  arrivalTime: DS.attr("string"),
  origin: MF.fragment("station-fragment"),
  destination: MF.fragment("station-fragment"),
  platform: DS.attr("string"),
  operator: DS.attr("string"),
  operatorCode: DS.attr("string"),
  etd: DS.attr("string"),

  isDelayed: function(){
    if(this.get("etd") === "On time"){
      return false;
    }else{
      return true;
    }
  }.property("etd"),

  status: function(){
    if(this.get("etd") === "On time"){
      return "On time";
    }else{
      return "Delayed";
    }
  }.property("etd"),

  delayedDepartureTime: function(){
    if(this.get("etd") === "Delayed"){
      return "Awaiting";
    }else{
      return this.get("etd");
    }
  }.property("etd"),
  dateNow: function(){
    return moment().format("DD/MM/YYYY");
  }.property()
});
