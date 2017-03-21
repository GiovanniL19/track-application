import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.service(),
  session: Ember.inject.service('session'),
  alert: Ember.inject.service("alert-message"),
  password: "",
  actions:{
    save(){
      let controller = this;
      let user = this.get("model");
      if(this.get("password") !== "") {
        let hashedPassword = md5("TRACK" + this.get('password') + "gfdfJguhgEf896tSd@&*&dhdUhfhdlS");
        user.set("password", hashedPassword);
      }

      if(this.get("password") !== "") {
        if(confirm("You are about to update your account with a new password")) {
          user.save().then(function () {
            controller.set("alert.message", "Account Updated");
          });
        }
      }else{
        user.save().then(function () {
          controller.set("alert.message", "Account Updated");
        });
      }

    },
    invalidate(){
      this.get('session').invalidate();
      this.set("navigation.user",null);
      this.transitionToRoute("find");
    }
  }
});
