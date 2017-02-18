import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  email: "",
  fullName: "",
  password: "",

  emailValidation: function(email) {
    //Uses Regular Expression and javaScript test to check the email matches the expression
    let regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Return the result of test
    return regularExpression.test(email);
  },

  actions: {
    registerAccount: function(){
      //Check email is valid
      if(this.emailValidation(this.get("email"))) {
        //Check full name
        if (this.get("fullName")) {

          /*
          //Regular expression for password
          //Password must:
          //Be 8 characters long
          //Contain at least one lower case
          //Contain at least one upper case
          //Contain at least one digit
          */

          let passwordRegularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

          if(this.get("password").match(passwordRegularExpression)){
            let controller = this;
            //Set current timestamp to dateCreated
            let dateCreated = moment().unix();

            //Get last word (last name) from fullName
            let fullName = this.get("fullName");
            let lastName = fullName.match(/\w+$/)[0];

            //Remove last word leaving the first (may include middle) name
            let indexOfLast = fullName.lastIndexOf(" ");
            let firstName = fullName.substring(0, indexOfLast);

            //Encrypt password
            let hashedPassword = md5("TRACK" + this.get("email") + this.get('password') + "gfdfJguhgEf896tSd@&*&dhdUhfhdlS");

            //Create user object
            var user = this.store.createRecord("user", {
              firstName: firstName,
              lastName: lastName,
              email: this.get("email"),
              username: this.get("email"),
              password: hashedPassword,
              dateCreated: dateCreated
            });

            //Save user
            user.save().then(function () {
              //Success
              controller.set("navigation.message", "Account Created!");
            }, function (error) {
              //An error occurred
              console.log(error);
              controller.set("navigation.message", "There was an error, try again later");
            });
          }else{
            this.set("navigation.message", "Password is not valid");
          }
        } else {
          this.set("navigation.message", "Please enter your full name");
        }
      }else{
        this.set("navigation.message", "Invalid email address");
      }
    }
  }
});
