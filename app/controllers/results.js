import Ember from 'ember';

export default Ember.Controller.extend({
  navigation: Ember.inject.controller(),
  origin: null,
  destination: null,
  service: null,

  actions:{
    back: function(){
      if(this.get("service")){
        this.set("service", null);
      }else{
        this.transitionToRoute("find");
      }
    },
    selectService: function(train){
      this.set("service", train);
    }
  }
});
