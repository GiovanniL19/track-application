import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('find');
  this.route('navigation');
  this.route('board');
  this.route('likes');
  this.route('account');
  this.route('login');
  this.route('register');
  this.route('find-results');
  this.route('train-information');
});

export default Router;
