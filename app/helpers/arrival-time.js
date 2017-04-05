import Ember from 'ember';

export function arrivalTime(params) {
  let destination = params.get("lastObject");
  var time = params.get("firstObject.arrivalTime");
  params.get("firstObject.callingPoints").forEach(function(points){
    try {
      points.forEach(function (point) {
        if (point.name === destination) {
          time = point.st;
        }
      });
    }catch(ignored){}
  });
  return time;
}

export default Ember.Helper.helper(arrivalTime);
