import Ember from 'ember';
import moment from 'moment';
import ENV from 'track-application/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  alert: Ember.inject.service('alert-message'),
  navigation: Ember.inject.service(),
  validate: Ember.inject.service("input-validation"),

  email: "",
  fullName: "",
  password: "",
  selectedImage: {
    image: "",
    imageSize: 0,
    imageType: ""
  },
  emailExists: false,
  userImage: null,

  uploadProfileImage: function(){
    var controller = this;
    controller.set('userImage', null);
    if(this.get("selectedImage.imageType")) {
      try {
        if (this.get('selectedImage.imageSize') > 3000000) {
          controller.set("navigation.message", "Image is too large, (max 30MB)");
        } else {
          let type = this.get('selectedImage.imageType');
          if (type === 'image/jpeg' || type === 'image/jpg' || type === 'image/png') {
            controller.set('userImage', this.get('selectedImage'));
          } else {
            controller.set("alert.message", "Image must be .JPG, .JPEG, or .PNG");
          }
        }
      } catch (err) {
        console.log('No profile picture selected');
        console.log(err);
      }
    }

  }.observes('selectedImage.image'),

  clearInput: function(){
    this.set("selectedImage", {
      "image": "",
      "imageSize": "",
      "imageType": "",
    });

    this.set("emailExists", "");
    this.set("fullName", "");
    this.set("password", "");
    this.set("email", "");
    this.set("selectedImage.image", "");
  },


  actions: {
    selectImage(){
      Ember.$('#selectImage').click();
    },

    registerAccount(){
      //Check email is valid
      if(this.get("validate").email(this.get("email"))) {
        //Set email to lowercase
        this.set("email", this.get("email").toLowerCase());
        let controller = this;

        //Check if email exists
        Ember.$.ajax({
          url: ENV.hostURL + '/users/check/exists/' + this.get("email"),
          type: 'GET',
          headers: {
            Accept : "application/json"
          },
          success: function(data) {
            if(data.exist){
              controller.set("alert.message", "Email already exists");
              controller.set("emailExists", true);
            }else{
              controller.set("emailExists", false);
              //Check full name
              if (controller.get("fullName")) {
                if(controller.get("password")){
                  //Set current timestamp to dateCreated
                  let dateCreated = moment().unix();

                  //Get last word (last name) from fullName
                  let fullName = controller.get("fullName");
                  let lastName = fullName.match(/\w+$/)[0];

                  //Remove last word leaving the first (may include middle) name
                  let indexOfLast = fullName.lastIndexOf(" ");
                  let firstName = fullName.substring(0, indexOfLast);

                  //Encrypt password
                  let hashedPassword = controller.get("validate").hashPassword(controller.get("password"));

                  //Create user object
                  var user = controller.store.createRecord("user", {
                    firstName: firstName,
                    lastName: lastName,
                    email: controller.get("email"),
                    username: controller.get("email"),
                    password: hashedPassword,
                    dateCreated: dateCreated,
                    image: controller.get("selectedImage.image")
                  });

                  //Save user
                  user.save().then(function () {
                    controller.clearInput();
                    //Success
                    controller.set("alert.message", "Account Created!");
                    controller.transitionToRoute("login");
                  }, function (error) {
                    //An error occurred
                    console.log(error);
                    controller.set("alert.message", "There was an error, try again later");
                  });
                }else{
                  controller.set("alert.message", "Password is not valid");
                }
              } else {
                controller.set("alert.message", "Please enter your full name");
              }
            }
          },
          error: function(err) {
            console.log(err);
            controller.set("alert.message", "There was an error, try again later");
          }
        });
      }else{
        this.set("alert.message", "Invalid email address");
      }
    }
  }
});
