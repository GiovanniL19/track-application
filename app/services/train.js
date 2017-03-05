import Ember from 'ember';

export default Ember.Service.extend({
  details: null,

  setDetails(details) {
    this.set("details", details);
  }

});
