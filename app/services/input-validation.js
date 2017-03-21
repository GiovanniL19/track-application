import Ember from 'ember';

export default Ember.Service.extend({
  hashPassword: function(password){
    return md5("TRACK" + password + "gfdfJguhgEf896tSd@&*&dhdUhfhdlS");
  },
  email: function(email){
    //Uses Regular Expression and javaScript test to check the email matches the expression
    let regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Return the result of test
    return regularExpression.test(email);
  }

});
