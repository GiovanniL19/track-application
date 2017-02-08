import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  session: Ember.inject.service('session'),
  identification: "",
  password: "",
  actions: {
    authenticate() {
      let controller = this;

      //Get credentials
      var credentials = {
        identification: this.get('identification'),
        password: ""
      };

      //Create hashed password
      var md5 = md5('hO*Y£&@GEPD*W' + this.get('password') + credentials.identification);
      credentials.set("password", md5);

      //Authenticate User
      var authenticator = 'authenticator:token';

      this.get('session').authenticate(authenticator, credentials).then(() => {
        controller.set('navigation.message', '');
        controller.transitionToRoute('find');
      }, (err) => {
        console.log(err);
        controller.set('navigation.message', 'Incorrect Login Details');
      });
    }
  }
});
