import DS from 'ember-data';

const {
  attr,
  belongsTo
} = DS;

export default DS.Model.extend({
  type: attr("string", {defaultValue: 'Context'}),
  user: belongsTo("user"),
  longitude: attr("string"),
  latitude: attr("string"),
  hour: attr("string"),
  day: attr("string"),
  city: attr("string"),
  count: attr("number")
});
