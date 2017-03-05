import Ember from 'ember';

export default Ember.Service.extend({
  message: "",
  visible: false,

  messageObserver: function(){
    let controller = this;
    if(this.get("message")){
      this.set("visible", true);
      setTimeout(function(){
        controller.set("message", null);
        controller.set("visible", false);
      }, 5000);
    }else{
      this.set("visible", false);
    }
  }.observes("message")
});
