import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'Route'}),
  starred: DS.belongsTo("user", {async: true, inverse: "starredJourneys"}),
  history: DS.belongsTo("user", {async: true, inverse: "journeyHistory"}),

  to: MF.fragment('station-fragment'),
  from: MF.fragment('station-fragment'),
  user: DS.belongsTo("user", {async: true})
});
