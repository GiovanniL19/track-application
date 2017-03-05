import Ember from 'ember';

export default Ember.Service.extend({
  isLoading: false,
  page:{
    find: true,
    board: false,
    likes: false,
    account: false,
    accountAccess:{
      login: false,
      register: false
    }
  },

  setPage(page){
    this.set('page', {
      find: false,
      board: false,
      likes: false,
      account: false,
      accountAccess: {
        login: false,
        register: false
      }
    });

    this.set('page.' + page, true);
  }
});
