import Ember from 'ember';

export function isCallingPointDelayed(params) {
  let callingPoint = params.get("firstObject");

  if (callingPoint.at === "On time") {
    return false;
  } else if (callingPoint.et === "On time") {
    return false;
  }else{
    return true;
  }
}

export default Ember.Helper.helper(isCallingPointDelayed);
