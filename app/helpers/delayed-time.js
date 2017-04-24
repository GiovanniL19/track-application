import Ember from 'ember';

export function delayedTime(params) {
  let train = params.get("firstObject");

  if(train.get("isPartOfBoard")){
    if(train.get("details.arrivalStatus") === "On time"){
      return "<span class='notDelayed'>On Time</span>";
    }else{
      return "<span class='delayed'>" + train.get("details.arrivalStatus") + "</span>";
    }
  }else {
    var response;
    train.get("details.callingPoints").forEach(function (points) {
      points.forEach(function (callingPoint) {
        if (callingPoint.name === train.get("userDestination")) {
          if (callingPoint.et) {
            if (callingPoint.et === "Delayed") {
              response = "<span class='delayed'>Delayed</span>";
            }else{
              try {
                let et = parseInt(callingPoint.et.replace(/:/g, ''));
                let st = parseInt(callingPoint.st.replace(/:/g, ''));
                if (et > st) {
                  response = "<span class='delayed'>"+callingPoint.et+"</span>";
                } else {
                  response = "<span class='notDelayed'>On Time</span>";
                }
              }catch(ignored){
                response = "<span class='notDelayed'>On Time</span>";
              }
            }
          }
        }
      });
    });

    return response;
  }
}

export default Ember.Helper.helper(delayedTime);
