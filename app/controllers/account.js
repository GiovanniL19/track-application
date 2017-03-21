import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.service(),
  session: Ember.inject.service('session'),
  alert: Ember.inject.service("alert-message"),
  validate: Ember.inject.service("input-validation"),
  currentEmail: "",
  password: "",

  saveUser: function(user){
    let controller = this;
    user.save().then(function () {
      controller.set("alert.message", "Account Updated");
    });
  },

  actions:{
    save(){
      let controller = this;
      let user = this.get("model");
      if(this.get("password") !== "") {
        let hashedPassword = this.get("validate").hashPassword(controller.get("password"));
        user.set("password", hashedPassword);
      }

      user.set("username", user.get("email"));
      if(this.get("currentEmail") === user.get("email")){
        this.saveUser(user);
      }else if(this.get("validate").email(user.get("email"))) {
        Ember.$.ajax({
          url: 'http://localhost:3002/users/check/exists/' + user.get("email"),
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
                  this.saveUser(user);
                }
              } else {
                this.saveUser(user);
              }
            }
          }
        });
      }else{
        controller.set("alert.message", "Invalid Email");
      }

    },
    invalidate(){
      this.get('session').invalidate();
      this.set("navigation.user",null);
      this.transitionToRoute("find");
    }
  }
});
