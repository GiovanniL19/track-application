import Ember from 'ember';

export default Ember.Service.extend({
  navigation: Ember.inject.service(),

  message: "",
  crs: "",


  getMessage: function(crs){
    let controller = this;
    let host = "localhost";

    if(crs){
      this.set("crs", crs);
      this.set("message", "");

      //Check if email exists
       Ember.$.ajax({
        url: 'http://' + host + ':3002/stations/message?station=' + crs,
        type: 'GET',
        headers: {
          Accept : "application/json"
        },
        success: function(data) {
          if(data.message !== ""){
            var rawMessage = data.message;
            controller.set("message", rawMessage);
          }
        },
        error: function(err) {
          console.log(err);
          controller.set("navigation.message", "There was an error, try again later");
        }
      });
    }
  }
});
