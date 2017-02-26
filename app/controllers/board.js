import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  trainInformation: Ember.inject.controller(),
  stations: [],
  station: "",
  crs: "",
  type: "departure",
  trains:[],

  actions:{
    selectTrain: function(train){
      this.set("trainInformation.train", train);
      this.transitionToRoute("train-information");
    },
    get: function(){
      let controller = this;
      var station;

      this.set("trains", []);
      this.set("navigation.isLoading", true);
      this.get("stations").forEach(function (foundStation) {
        if (foundStation.get("name") === controller.get("station")) {
          station = foundStation;
        }
      });

      if(station){
        this.set("navigation.crs", station.get("crs"));
        this.store.query("train", {type: this.get("type") ,location: station.get("crs")}).then(function(trains){
          controller.set("trains", trains);
          controller.set("navigation.isLoading", false);
        }, function(err){
          console.log(err);
          controller.set("navigation.isLoading", false);
          controller.set("navigation.message", "There was an error, try again later");
        });
      }else{
        this.set("navigation.isLoading", false);
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
