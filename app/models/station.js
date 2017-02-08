import DS from 'ember-data';

export default MF.Fragment.extend({
  type: DS.attr("string", {defaultValue: 'Station'}),

  name: DS.attr("string"),
  crs: DS.attr("string"),
  message: DS.attr("string"),

  viewCount: DS.attr("string")
});
