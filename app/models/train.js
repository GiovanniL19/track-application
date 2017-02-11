import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'train'}),
  callingPoints: MF.fragmentArray("station"),
  std: DS.attr("string"),
  arrivalStatus: DS.attr("string"),
  arrivalTime: DS.attr("string"),
  origin: MF.fragment("station"),
  destination: MF.fragment("station"),
  platform: DS.attr("string"),
  operator: DS.attr("string"),
  operatorCode: DS.attr("string"),
  etd: DS.attr("string"),
  serviceID: DS.attr("string"),

  isDelayed: function(){
    if(this.get("etd") === "On Time"){
      return false;
    }else{
      return true;
    }
  }.property("etd")
});
