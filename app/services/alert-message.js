import Ember from 'ember';

export default Ember.Service.extend({
  message: "",
  visible: false,
  warning: true,
  messageObserver: function(){
    let controller = this;
    if(this.get("message")){
      this.set("visible", true);
      setTimeout(function(){
        controller.set("message", null);
        controller.set("visible", false);
        controller.set("warning", true);
      }, 3000);
    }else{
      this.set("visible", false);
    }
  }.observes("message")
});
