import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
	session: inject(),
	booksRepository: inject(),

	beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },

	model: function (parameters) {
		return {
			book: this.get('booksRepository').getPreview(parameters.book_isbn)
		}
	}

});
