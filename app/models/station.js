import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'station'}),

  name: DS.attr("string"),
  crs: DS.attr("string"),
  message: DS.attr("string"),

  viewCount: DS.attr("string")
});
