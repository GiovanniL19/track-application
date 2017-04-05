import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  train: Ember.inject.service(),
  details: null,
  destination: "",
  destinationCRS: "",
  origin: "",
  originCRS: "",
  isPartOfBoard: false,
  actions:{
    select(){
      this.get("train").setDetails(this.get("details"));
      this.set("train.userDestination", this.get("destination"));
      this.set("train.userDestinationCRS", this.get("destinationCRS"));
      this.set("train.userOrigin", this.get("origin"));
      this.set("train.userOriginCRS", this.get("originCRS"));
      this.set("train.isPartOfBoard", this.get("isPartOfBoard"));
      this.get("routing").transitionTo("train-information");
    }
  }
});
