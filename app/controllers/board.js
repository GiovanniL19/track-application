import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  stations: [],
  station: "",
  stationMessage: "",
  type: "departure",
  trains:[],

  actions:{
    get: function(){
      let controller = this;
      var station;

      this.get("stations").forEach(function (foundStation) {
        if (foundStation.get("name") === controller.get("station")) {
          station = foundStation;
        }
      });

      if(station){
        this.store.query("train", {type: this.get("type") ,location: station.get("crs")}).then(function(trains){
          controller.set("trains", trains);
        }, function(err){
          console.log(err);
          controller.set("navigation.message", "There was an error, try again later");
        });
      }else{
        this.set("navigation.message", "Please enter station");
      }
    },
    showStationMessage: function(){
      Ember.$('#stationMessage').modal();
    },
    selectType: function(value){
      this.set("type", value);
    }
  }
});
