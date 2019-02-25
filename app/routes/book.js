import { inject } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
	booksRepository: inject(),

	model: function (parameters) {
		return this.get('booksRepository').getBookSync(parameters.book_id);
	}

});
