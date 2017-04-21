import attr from 'ember-data/attr';
import Fragment from 'ember-data-model-fragments/fragment';

export default Fragment.extend({
  name: attr("string"),
  crs: attr("string"),
  et: attr("string"),
  st: attr("string"),
  at: attr("string"),
});
