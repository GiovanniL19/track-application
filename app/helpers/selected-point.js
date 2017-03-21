import Ember from 'ember';

export function selectedPoint(params) {
  if(params.get("firstObject") === params.get("lastObject")){
    return true;
  }else{
    return false;
  }
}

export default Ember.Helper.helper(selectedPoint);
