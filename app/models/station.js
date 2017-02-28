import DS from 'ember-data';

const {
  attr
} = DS;


export default DS.Model.extend({
  type: attr("string", {defaultValue: 'station'}),

  name: attr("string"),
  crs: attr("string"),
  message: attr("string"),

  viewCount: attr("string")
});
