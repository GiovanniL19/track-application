import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  session: Ember.inject.service('session'),
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
         let hashedPassword = md5("TRACK" + controller.get("identification") + controller.get('password') + "gfdfJguhgEf896tSd@&*&dhdUhfhdlS");
         credentials.password = hashedPassword;

         //Authenticate User
         var authenticator = 'authenticator:token';

         this.get('session').authenticate(authenticator, credentials).then(() => {
           controller.set('navigation.message', '');
           controller.transitionToRoute('find');
           controller.set("navigation.isLoading", false);
         }, (err) => {
           console.log(err);
           controller.set("navigation.isLoading", false);
           if(err === "Incorrect Username"){
             controller.set('navigation.message', 'Username does not exist');
           }else if(err === "Incorrect Password"){
             controller.set('navigation.message', 'Password is incorrect');
           }else{
             controller.set('navigation.message', 'There was an error, try again later');
           }
         });
       }else{
         controller.set('navigation.message', 'Please enter your password');
       }
      }else{
        controller.set('navigation.message', 'Please enter your email');
      }
    }
  }
});
