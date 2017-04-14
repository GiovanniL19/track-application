//Data API
import DS from "ember-data";
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'track-application/config/environment';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
	host: ENV.hostURL,
  authorizer: 'authorizer:token',
});
