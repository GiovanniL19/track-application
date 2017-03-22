import Ember from 'ember';

export default Ember.Component.extend({
  routing: Ember.inject.service('-routing'),
  train: Ember.inject.service(),
  details: null,
  destination: "",

  actions:{
    select(){
      this.get("train").setDetails(this.get("details"));
      this.set("train.userDestination", this.get("destination"));
      this.get("routing").transitionTo("train-information");
    }
  }
});
