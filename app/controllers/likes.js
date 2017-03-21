import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.service(),
  alert: Ember.inject.service("alert-message"),
  application: Ember.inject.controller(),

  actions: {
    removeLiked(journey){
      let controller = this;
      let userID = journey.get("starred.id");

      this.store.find("user", userID).then(function (user) {
        user.get("starredJourneys").removeObject(journey);

        user.save().then(function(){
          journey.destroyRecord().then(function(){
            controller.set("alert.message", "Journey Removed");
          });
        });

      });
    },
    select(journey){
      this.transitionToRoute("find-results", {queryParams: {
        origin: journey.get("from.name"),
        destination: journey.get("to.name"),
        originCRS: journey.get("from.crs"),
        destinationCRS: journey.get("to.crs")
      }});
    }
  }
});
