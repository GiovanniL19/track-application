import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  findResults: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  stations: [],
  fromStation: "",
  toStation: "",
  dateTime: null,
  dateSelected: "Today, now",

  dateChange: function(){
    this.set("dateSelected", moment.unix(this.get("dateTime")).format("DD/MMM, HH:mm"));
  }.observes("dateTime"),

  actions: {
    showDateTimeSelect: function(){
      this.set("navigation.date", moment(Date.now())).format("DD/MM/YYYY");
      Ember.$('#timeDateSelect').modal();
    },
    getTrains: function(){
      let controller = this;

      if(this.get("fromStation") && this.get("toStation")){
        if(this.get('fromStation') !== this.get("toStation")){
          var from = "";
          var to = "";

          this.get("stations").forEach(function (station) {
            if (station.get("name") === controller.get("fromStation")) {
              from = station;
            }

            if (station.get("name") === controller.get("toStation")) {
              to = station;
            }
          });

          this.set("findResults.origin", from);
          this.set("findResults.destination", to);
          this.transitionToRoute("find-results");
        }else{
          this.set("navigation.message", "From and to stations must be valid");
        }
      }else{
        this.set("navigation.message", "Please ensure you have a to and from station");
      }
    }
  }
});
