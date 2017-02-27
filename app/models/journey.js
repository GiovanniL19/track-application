import DS from 'ember-data';
import MF from 'model-fragments';

const {
  attr,
  belongsTo
} = DS;

const {
  fragment,
} = MF;

export default DS.Model.extend({
  type: attr("string", {defaultValue: 'Route'}),
  starred: belongsTo("user", {async: true, inverse: "starredJourneys"}),
  history: belongsTo("user", {async: true, inverse: "journeyHistory"}),

  to: fragment('station-fragment'),
  from: fragment('station-fragment'),
  user: belongsTo("user", {async: true})
});
