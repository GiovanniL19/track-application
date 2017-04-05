import Ember from 'ember';

export default Ember.Service.extend({
  details: null,
  userDestination: "",
  userDestinationCRS: "",
  userOrigin: "",
  userOriginCRS: "",
  isPartOfBoard: false,
  setDetails(details) {
    this.set("details", details);
  }

});
