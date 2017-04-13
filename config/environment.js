/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'track-application',
    environment: environment,
    baseURL: '/',
    hostURL: 'http://localhost:3002', //Local
    //hostURL: 'https://83da5908.ngrok.io', //Pi


    defaultLocationType: 'auto',
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

  ENV.contentSecurityPolicy = {
    'default-src': "'self' https://83da5908.ngrok.io",
      'script-src': "'self' 'unsafe-inline'",
      'style-src': "'self' 'unsafe-inline'",
      'font-src': "'self'",
      'connect-src': "'self' "+ENV.hostURL+", http://[::1]:3002/",
      'img-src': "'self' data:",
      'media-src': "'self'"
  }

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
    ENV.hostURL = 'https://83da5908.ngrok.io';
    
    //Sets up authentication
    ENV['ember-simple-auth'] = {
      authorizer: 'authorizer:token'
    };
    ENV['ember-simple-auth-token'] = {
      serverTokenEndpoint: ENV.hostURL + '/users/auth'
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
      serverTokenEndpoint: ENV.hostURL + '/users/auth'
    };
  }
  return ENV;
};
