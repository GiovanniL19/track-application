import Ember from 'ember';

export default Ember.Service.extend({
  details: null,
  userDestination: "",
  setDetails(details) {
    this.set("details", details);
  }

});
