import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  email: "",
  fullName: "",
  password: "",

  selectedImage: {
    image: null,
    imageSize: 0,
    imageType: ""
  },
  userImage: null,

  uploadProfileImage: function(){
    var controller = this;
    controller.set('userImage', null);
    try {
      if(this.get('selectedImage.imageSize') > 3000000){
        controller.set("navigation.message", "Image is too large, (max 30MB)")
      }else{
        let type = this.get('selectedImage.imageType');
        if(type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png'){
          controller.set('userImage', this.get('selectedImage'));
        }else{
          controller.set("navigation.message", "Image must be .JPG, .JPEG, or .PNG");
        }
      }
    } catch(err){
      console.log('No profile picture selected');
      console.log(err);
    }

  }.observes('selectedImage.image'),

  emailValidation: function(email) {
    //Uses Regular Expression and javaScript test to check the email matches the expression
    let regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Return the result of test
    return regularExpression.test(email);
  },

  actions: {
    selectImage: function(){
      $('#selectImage').click();
    },
    registerAccount: function(){
      //Check email is valid
      if(this.emailValidation(this.get("email"))) {
        //Check full name
        if (this.get("fullName")) {
          if(this.get("password")){
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
              controller.transitionToRoute("login");
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
