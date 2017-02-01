import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'Route'}),
  stared: DS.belongsTo("user", {async: true, inverse: "staredRoutes"}),
  history: DS.belongsTo("user", {async: true, inverse: "routesHistory"}),

  to: MF.fragment('station'),
  from: MF.fragment('station'),
  user: DS.belongsTo("user", {async: true})
});
