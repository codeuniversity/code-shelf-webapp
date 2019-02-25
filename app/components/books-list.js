import { inject } from '@ember/service';
import Component from '@ember/component';

let page = 1;

export default Component.extend({
	booksRepository: inject(),

	init: function () {
		this._super(...arguments);
		this.books = [];
	},

	didInsertElement: function () {
		this.getNextBooks();
	},

	getNextBooks: function () {
		this.get('booksRepository').getBooksListPage(page++).then(response => {
			this.get('books').pushObjects(response);
		});
	}

});
