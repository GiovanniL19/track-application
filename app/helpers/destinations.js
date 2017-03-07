import Ember from 'ember';

export function destinations([ array, index]) {
  return array[index];
};

export default Ember.Helper.helper(destinations);
