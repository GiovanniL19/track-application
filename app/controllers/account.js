import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  session: Ember.inject.service('session')
});
