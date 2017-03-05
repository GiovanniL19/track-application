import Ember from 'ember';

export default Ember.Controller.extend({
  location: Ember.inject.service(),
  alert: Ember.inject.service("alert-message"),
  session: Ember.inject.service('session'),
  sideMenu: Ember.inject.service(),
  navigation: Ember.inject.service(),

  find: Ember.inject.controller(),
  board: Ember.inject.controller(),

  nearbyStationsToggle: false,
  user: null,

  isLoggedIn: function(){
    let controller = this;
    if(this.get('session.isAuthenticated')){
      return this.store.find("user", this.get('session.session.authenticated.user')).then(function (user) {
        controller.set("user", user);
        return true;
      });
    }else{
      return false;
    }
  }.property('session.isAuthenticated'),

  actions:{
    changePage(route){
      if(route === "account" && this.get("isLoggedIn") === false){
        //Transition to route
        this.transitionToRoute("login");
      }else {
        //Transition to route
        this.transitionToRoute(route);
      }

      //Close menu when linked clicked if menu is open
      if(this.get("sideMenu.isOpen")){
        this.get("sideMenu").close();
      }
    }
  }
});
