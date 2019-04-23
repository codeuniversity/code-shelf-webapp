import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject } from '@ember/service';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  optimize: inject(),

  didTransition() {
    this._super(...arguments);
    this._activateOptimize();
  },

  _activateOptimize() {
     /*eslint-disable */
    scheduleOnce("afterRender", this, () => {
      get(this, "optimize").activate();
    });
    /*eslint-enable */
  }

});

Router.map(function() {
  this.route('unauthorized');
  this.route('book', {path: '/book/:book_id'});
  this.route('preview', {path: '/preview/:book_isbn'});
  this.route('history');
});

Router.reopen({
    didTransition() {
        /*eslint-disable */
        return ga('send', 'pageview', {
            'page': this.get('url'),
            'title': this.get('url')
        });
        /*eslint-enable */
    }
});

export default Router;
