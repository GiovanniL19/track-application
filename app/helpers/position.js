import Ember from 'ember';

export function position(index) {
  return parseInt(index) + 1;
}

export default Ember.Helper.helper(position);
