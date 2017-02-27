import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  sideMenu: Ember.inject.service(),
  board: Ember.inject.controller(),
  find: Ember.inject.controller(),
  isLoading: false,
  crs:"",
  page:{
    find: true,
    board: false,
    likes: false,
    account: false,
    accountAccess:{
      login: false,
      register: false
    }
  },
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
  message: "",

  messageObserver: function(){
    if(this.get("message")){

      let controller = this;

      setTimeout(function(){
        controller.set("message", null);
      }, 5000);
    }
  }.observes("message"),
  isLoggedIn: function(){
    if(this.get('session.isAuthenticated')){
      return true;
    }else{
      return false;
    }
  }.property('session.isAuthenticated'),
  actions:{
    selectTime: function(value){
      this.set("timeSelected", value);
    },
    selectType: function(value){
      this.set("timeType", value);
      console.log(this.get("date"));
    },
    changePage: function(route){
      if(route === "account" && this.get("isLoggedIn") === false){
        //Transition to route
        this.transitionToRoute("login");
      }else {
        //Transition to route
        this.transitionToRoute(route);
      }

      //Close menu when linked clicked if menu is open
      if(this.get("sideMenu.isOpen")){
        this.get("sideMenu").close();
      }
    },
    finaliseInput: function(){
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
        console.log("date is in past");
        this.set("message", "The departure time cannot be in the past");
      }else{
        //Send timestamp to find controller
        this.set("find.dateTime", timestamp);
      }
    }
  }
});
