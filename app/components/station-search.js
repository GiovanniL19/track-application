import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'',
  placeholder: "",
  class: "",
  describedby: "",
  id: "",

  station: null,
  content: [],
  output: [],
  value: "",
  showResults: false,

  setValue: function(){
    this.set("value", this.get("station"));
  }.observes("station"),
  filteredResults: function() {
    try {
      if(this.get("station").length >= 3) {
        let regExp = new RegExp(this.get("station").toLowerCase());
        return this.get('content').filter(function (item) {
          return regExp.test(item.get('name').toLowerCase());
        });
      }else{
        return [];
      }
    }catch(ex){
      //console.log(ex);
      //No need to filter
      return [];
    }
  }.property('station'),

  actions: {
    focusOut: function() {
      let controller = this;
      setTimeout(function(){
        controller.set("showResults", false);
      },300);
    },
    autoComplete: function() {
      let station = this.get("station");
      this.set("station", station);

      this.set("showResults", true);
    },
    select: function(station) {
      this.set('station', station.get("name"));
      this.set("showResults", false);
    }
  }
});
