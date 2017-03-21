import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  journeys: [],
  value: null,
  loading: false,

  actions: {
    findTrains(journey){
      this.set("value", journey);
    }
  }
});
