import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),
  alert: Ember.inject.service('alert-message'),
  navigation: Ember.inject.service(),
  validate: Ember.inject.service("input-validation"),

  identification: "",
  password: "",

  actions: {
    authenticate() {
      let controller = this;
      if(this.get('identification')){
       if(this.get('password')){
         this.set("navigation.isLoading", true);

         //Get credentials
         var credentials = {
           identification: this.get('identification'),
           password: ""
         };

         //Create hashed password
         let hashedPassword = this.get("validate").hashPassword(controller.get("password"));
         credentials.password = hashedPassword;

         //Authenticate User
         var authenticator = 'authenticator:token';

         this.get('session').authenticate(authenticator, credentials).then(() => {
           controller.set('alert.message', '');
           controller.transitionToRoute('find');
           controller.set("navigation.isLoading", false);
         }, (err) => {
           console.log(err);
           controller.set("navigation.isLoading", false);
           if(err === "Incorrect Username"){
             controller.set('alert.message', 'Username does not exist');
           }else if(err === "Incorrect Password"){
             controller.set('alert.message', 'Password is incorrect');
           }else{
             controller.set('alert.message', 'There was an error, try again later');
           }
         });
       }else{
         controller.set('alert.message', 'Please enter your password');
       }
      }else{
        controller.set('alert.message', 'Please enter your email');
      }
    }
  }
});
