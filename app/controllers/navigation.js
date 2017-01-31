import Ember from 'ember';

export default Ember.Controller.extend({
  page:{
    find: true,
    board: false
  },

  actions:{
    changePage: function(route){
      //Resets page type
      this.set("page", {
        find: false,
        board: false
      });

      //Set the page for page indication in navigation
      switch(route){
        case "find":
          this.set('page.find', true);
          break;

        case "board":
          this.set('page.board', true);
          break;
      }

      //Transition to route
      this.transitionToRoute(route);

    }
  }
});
