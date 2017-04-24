import Ember from 'ember';
import ENV from 'track-application/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  alert: Ember.inject.service("alert-message"),
  navigation: Ember.inject.service(),
  validate: Ember.inject.service("input-validation"),
  currentEmail: "",
  password: "",
  save: function(user){
    let controller = this;
    user.save().then(function(){
      controller.set("alert.warning", false);
      controller.set("alert.message", "Account Saved");
    });
  },

  actions:{
    deleteAccount(){
      let controller = this;
      if(confirm("You are about to delete your account. WARNING: You can not undo this process!")){
        this.get("model").destroyRecord().then(function () {
          controller.get('session').invalidate();
          controller.set("navigation.user", null);
          controller.transitionToRoute("find");
          controller.set("alert.message", "Account deleted");
        });
      }
    },

    saveAccount(){
      let controller = this;
      let user = this.get("model");
      if(this.get("password") !== "") {
        let hashedPassword = this.get("validate").hashPassword(controller.get("password"));
        user.set("password", hashedPassword);
      }

      user.set("username", user.get("email"));
      if(this.get("currentEmail") === user.get("email")){
        controller.save(user);
      }else if(this.get("validate").email(user.get("email"))) {
        Ember.$.ajax({
          url: ENV.hostURL + '/users/check/exists/' + user.get("email"),
          type: 'GET',
          headers: {
            Accept: "application/json"
          },
          success: function (data) {
            if (data.exist) {
              controller.set("alert.message", "Email already exists");
            }else{
              if (controller.get("password") !== "") {
                if (confirm("You are about to update your account with a new password")) {
                  controller.set("currentEmail", user.get("email"));
                  controller.save(user);
                }
              } else {
                controller.save(user);
              }
            }
          }
        });
      }else{
        controller.set("alert.message", "Invalid Email");
      }

    },

    invalidate(){
      this.transitionToRoute("find");
      this.get('session').invalidate();
      this.set("navigation.user", null);
    }
  }
});
