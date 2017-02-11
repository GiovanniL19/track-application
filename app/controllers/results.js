import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  origin: null,
  destination: null
});
