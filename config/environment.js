'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'code-shelf-webapp',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DB_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID
    },

    torii: {
      sessionServiceName: 'session'
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.googleOptimize = {
      container: "GTM-TRBRLX6"
    };
  }

  ENV.SERVER_URL = process.env.SERVER_URL;
  ENV.USER_EXISTENCE_ENDPOINT = '/user/exists/';
  ENV.USER_DATA_ENDPOINT = '/user/';
  ENV.AUTHORIZATION_ENDPOINT = '/user/authorized/';

  ENV.BOOKS_ENDPOINT = '/book/';
  ENV.BOOK_DATA_BY_ISBN_ENPOINT = '/book/isbn/';
  ENV.BOOK_PREVIEW_ENPOINT = '/book/preview/';
  ENV.BOOK_EXISTENCE_ENDPOINT = '/book/exists/';

  ENV.BOOK_REVIEWS_ENDPOINT = '/review/';
  ENV.BOOK_CHECKOUT_ENDPOINT = '/book/checkout/';
  ENV.BOOK_RETURN_ENDPOINT = '/book/return/';

  return ENV;
};
