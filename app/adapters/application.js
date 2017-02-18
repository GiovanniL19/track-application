//Data API
import DS from "ember-data";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
  //Sets up REST adapter to look at localhost server
  authorizer: 'authorizer:token',
	host: 'http://10.205.205.198:3002'
});
