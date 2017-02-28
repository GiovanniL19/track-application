import DS from 'ember-data';
import MF from 'model-fragments';
import moment from 'moment';

const {
  attr
} = DS;

const {
  fragment,
  fragmentArray
} = MF;

export default DS.Model.extend({
  type: attr("string", {defaultValue: 'train'}),
  callingPoints: fragmentArray("station-fragment"),
  std: attr("string"),
  etd: attr("string"),
  origin: fragment("station-fragment"),
  destination: fragment("station-fragment"),
  platform: attr("string"),
  operator: attr("string"),
  operatorCode: attr("string"),

  //Arrival Information
  arrivalStatus: attr("string"),
  arrivalTime: attr("string"),
  sta: attr("string"),
  eta: attr("string"),
  at: attr("string"),

  isArrival: function(){
    if(this.get("sta")){
      return true;
    }else{
      return false;
    }
  }.property("sta", "at"),
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
