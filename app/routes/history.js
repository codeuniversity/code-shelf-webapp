import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
	session: inject(),
	booksRepository: inject(),

	beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  }

});
