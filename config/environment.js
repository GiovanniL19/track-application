/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'track-application',
    environment: environment,
    baseURL: '/',
    defaultLocationType: 'auto',
    contentSecurityPolicy: {
      'default-src': "'self' http://localhost:3002",
      'script-src': "'self' 'unsafe-inline'",
      'style-src': "'self' 'unsafe-inline'",
      'font-src': "'self'",
      'connect-src': "'self' http://localhost:3002, http://[::1]:3002/",
      'img-src': "'self' data:",
      'media-src': "'self'"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    cordova: {
      rebuildOnChange: false,
      emulate: false
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }


  if (environment === 'production' || environment === 'release'){
    //Sets up authentication
    ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://10.205.205.198:3002/users/auth'
    };

    //Minify the CSS and JavaScript
    minifyCSS: {
      enabled: true
    }
    minifyJS: {
      enabled: true
    }

  }else{
    //Sets up authentication
    ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: 'http://10.205.205.198:3002/users/auth'
    };
  }
  return ENV;
};
