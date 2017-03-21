import Ember from 'ember';

export function arrivalTime(params) {
  let destination = params.get("lastObject");
  var time;
  params.get("firstObject.callingPoints").forEach(function(points){
    points.forEach(function(point){
      if(point.name === destination){
        time = point.st;
      }
    });
  });
  return time;
}

export default Ember.Helper.helper(arrivalTime);
