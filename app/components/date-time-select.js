import Ember from 'ember';

export default Ember.Component.extend({
  dateTimeSelect: Ember.inject.service(),
  alert: Ember.inject.service("alert-message"),

  date: null,
  timeSelected: "1:00",
  timeType: "AM",
  timeList: [
    "1:00",
    "1:30",
    "2:00",
    "2:30",
    "3:00",
    "3:30",
    "4:00",
    "4:30",
    "5:00",
    "5:30",
    "6:00",
    "6:30",
    "7:00",
    "7:30",
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30"
  ],

  init(){
    this._super(...arguments);
    this.set("date", moment(Date.now())).format("DD/MM/YYYY");
  },

  actions:{
    set(){
      Ember.$("#timeDateSelect").modal("hide");

      //Get time and date from user input
      var time = this.get("timeSelected") + " " + this.get("timeType");
      var date = this.get("date");

      //Format time and date separate
      var formatTime  = moment(time, "hh:mm A").format("HH:mm");
      var getDateTimestamp = moment(date).format("DD/MM/YYYY");

      //Combine time and date and get timestamp
      var timestamp = moment(getDateTimestamp + " " + formatTime, "DD/MM/YYYY HH:mm").unix();

      if(timestamp < moment().unix()){
        //Send message to service
        this.set("alert.message", "The departure time cannot be in the past");
      }else{
        //Send timestamp to service
        this.set("dateTimeSelect.dateTime", timestamp);
      }
    },

    selectTime(value){
      this.set("timeSelected", value);
    },

    selectType(value){
      this.set("timeType", value);
    }
  }
});
