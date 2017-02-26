import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'train'}),
  callingPoints: MF.fragmentArray("station-fragment"),
  std: DS.attr("string"),
  etd: DS.attr("string"),
  origin: MF.fragment("station-fragment"),
  destination: MF.fragment("station-fragment"),
  platform: DS.attr("string"),
  operator: DS.attr("string"),
  operatorCode: DS.attr("string"),

  //Arrival Information
  arrivalStatus: DS.attr("string"),
  arrivalTime: DS.attr("string"),
  sta: DS.attr("string"),
  eta: DS.attr("string"),
  at: DS.attr("string"),

  isDelayed: function(){
    if(this.get("etd")) {
      if (this.get("etd") === "On time") {
        return false;
      } else {
        return true;
      }
    }else{
      if (this.get("eta") === "On time") {
        return false;
      } else {
        return true;
      }
    }
  }.property("etd", "eta"),

  status: function(){
    if(this.get("etd")) {
      if (this.get("etd") === "On time") {
        return "On time";
      } else {
        return "Delayed";
      }
    }else{
      if (this.get("eta") === "On time") {
        return "On time";
      } else {
        return "Delayed";
      }
    }
  }.property("etd", "eta"),

  delayedTime: function(){
    if(this.get("etd")) {
      if (this.get("etd") === "Delayed") {
        return "Awaiting";
      } else {
        return this.get("etd");
      }
    }else{
      if(this.get("eta") === "Delayed"){
        return "Awaiting";
      }else{
        return this.get("eta");
      }
    }
  }.property("etd", "eta"),

  dateNow: function(){
    return moment().format("DD/MM/YYYY");
  }.property()
});
