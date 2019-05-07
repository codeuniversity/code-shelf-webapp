import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('unauthorized');
  this.route('book', {path: '/book/:book_id'});
  this.route('preview', {path: '/preview/:book_isbn'});
  this.route('history');
});

export default Router;
