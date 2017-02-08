import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'Train'}),
  callingPoints: MF.fragmentArray("station"),
  std: DS.attr("number"),
  arrivalTime: DS.attr("date"),
  origin: MF.fragment("station"),
  destination: MF.fragment("station"),
  platform: DS.attr("number"),
  operator: DS.attr("string"),
  operatorCode: DS.attr("string"),
  etd: DS.attr("string"),
  serviceId: DS.attr("string")
});
