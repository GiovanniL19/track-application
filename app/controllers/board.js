import Ember from 'ember';

export default Ember.Controller.extend({
  alert: Ember.inject.service('alert-message'),
  stationMessage: Ember.inject.service(),
  navigation: Ember.inject.service(),

  stations: [],
  station: "",
  crs: "",
  type: "departure",
  trains:[],

  isArrival: function() {
    if(this.get("type") === "arrival"){
      return true;
    }else{
      return false;
    }
  }.property("type"),
  isDeparture: function() {
    if(this.get("type") === "departure"){
      return true;
    }else{
      return false;
    }
  }.property("type"),

  actions:{
    get(){
      let controller = this;
      var station = null;

      //Clear existing data
      this.set("crs", "");
      this.set("trains", []);
      this.set("navigation.isLoading", true);

      //Lookup and get station
      this.get("stations").forEach(function (foundStation) {
        if (foundStation.get("name") === controller.get("station")) {
          station = foundStation;
        }
      });

      //If station is found set properties
      if(station != null){
        this.set("crs", station.get("crs"));

        //Get message
        controller.get("stationMessage").getMessage(station.get("crs"));

        this.store.query("train", {type: this.get("type") ,location: station.get("crs")}).then(function(trains){
          controller.set("trains", trains);

          controller.set("navigation.isLoading", false);
        }, function(err){
          console.log(err);
          controller.set("navigation.isLoading", false);
          controller.set("alert.message", err.errors[0].detail);
        });
      }else{
        this.set("navigation.isLoading", false);
        this.set("alert.message", "Please enter station");
      }
    },

    showStationMessage(){
      //Opens modal
      Ember.$('#stationMessage').modal();
    },

    selectType(value){
      //Sets type of board
      this.set("type", value);
    }
  }
});
