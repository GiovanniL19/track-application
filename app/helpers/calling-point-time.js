import Ember from 'ember';

export function callingPointTime(params) {
  let callingPoint = params.get("firstObject");
  if(callingPoint.at) {
   if (callingPoint.at === "Delayed") {
      return "Delayed";
    } else {
      return callingPoint.at;
    }
  }else{
    if (callingPoint.et === "Delayed") {
      return "Delayed";
    } else {
      return callingPoint.et;
    }
  }
}

export default Ember.Helper.helper(callingPointTime);
