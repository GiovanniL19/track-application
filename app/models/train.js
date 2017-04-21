import DS from 'ember-data';
import MF from 'ember-data-model-fragments';
import moment from 'moment';

const {
  attr
} = DS;

const {
  fragment,
  array
} = MF;

export default DS.Model.extend({
  type: attr("string", {defaultValue: 'train'}),
  callingPoints: array(),
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
  trainSplits: attr("boolean"),

  destinations: function(){
    return this.get("destination.name").split(" & ");
  }.property("destination"),

  origins: function(){
    return this.get("origin.name").split(" & ");
  }.property("origin"),

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
        if (this.get("etd") === "Cancelled") {
          return "Cancelled";
        }else {
          return "Delayed";
        }
      }
    }else{
      if (this.get("eta") === "On time") {
        return "On time";
      } else {
        if (this.get("eta") === "Cancelled") {
          return "Cancelled";
        }else {
          return "Delayed";
        }
      }
    }
  }.property("etd", "eta"),

  isCancelled: function(){
    if (this.get("eta") === "Cancelled") {
      return true;
    }else if (this.get("etd") === "Cancelled") {
      return true;
    }else{
      return false;
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
