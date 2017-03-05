import Ember from 'ember';

export default Ember.Component.extend({
  crs: "",
  message: "",

  getMessage: function(){
    let host = "localhost";
    let controller = this;
    if(this.get("crs")){
      //Check if email exists
      return Ember.$.ajax({
        url: 'http://' + host + ':3002/stations/message?station=' + this.get("crs"),
        type: 'GET',
        headers: {
          Accept : "application/json"
        },
        success: function(data) {
          if(data.message === ""){
            controller.set("message", "No station message");
          }else{
            var rawMessage = data.message;
            controller.set("message", rawMessage);
          }
        },
        error: function(err) {
          console.log(err);
          controller.set("navigation.message", "There was an error, try again later");
          controller.set("message", "There was an error, try again later");
        }
      });
    }
  }.observes("crs")
});
