import DS from 'ember-data';
import MF from 'model-fragments';

export default DS.Model.extend({
  type: DS.attr("string", {defaultValue: 'Route'}),
  stared: DS.belongsTo("user", {async: true, inverse: "staredRoutes"}),
  history: DS.belongsTo("user", {async: true, inverse: "routesHistory"}),

  to: MF.fragment('station-fragment'),
  from: MF.fragment('station-fragment'),
  user: DS.belongsTo("user", {async: true})
});
