//Data API
import DS from "ember-data";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend({
  //Sets up REST adapter to look at localhost server
	host: 'http://localhost:3002',
});
