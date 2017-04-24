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

  filteredResults: function() {
    try {
      if(this.get("station").length >= 3) {
        let regExp = new RegExp(this.get("station").toLowerCase(), 'g');

        var crsResult = this.get('content').filter(function (item) {
          return regExp.test(item.get('crs').toLowerCase());
        });

        var nameResult = this.get('content').filter(function (item) {
          return regExp.test(item.get('name').toLowerCase().replace(/[^\w\s]/gi, ' '));
        });


        //Remove duplicates (if any) and return array
        var results = Array.from(new Set(crsResult.concat(nameResult)));

        return results.reverse();
      }else{
        return [];
      }
    }catch(ignored){
      //No need to filter
      return [];
    }
  }.property('station'),

  setValue: function(){
    this.set("value", this.get("station"));
  }.observes("station"),

  actions: {
    focusOut() {
      let controller = this;
      setTimeout(function(){
        controller.set("showResults", false);
      },300);
    },

    autoComplete() {
      let station = this.get("station");
      this.set("station", station);

      this.set("showResults", true);
    },

    select(station) {
      this.set('station', station.get("name"));
      this.set("showResults", false);
    }
  }
});
