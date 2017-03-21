import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.service(),
  application: Ember.inject.controller(),

  actions: {
    select(journey){
      this.transitionToRoute("find-results", {queryParams: {
        origin: journey.get("from.name"),
        destination: journey.get("to.name"),
        originCRS: journey.get("from.crs"),
        destinationCRS: journey.get("to.crs")
      }});
    }
  }
});
