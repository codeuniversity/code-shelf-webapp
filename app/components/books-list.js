import $ from 'jquery';
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
		let self = this;

		$(window).scroll(() => {
			if($(window).scrollTop() + $(window).height() == $(document).height()) {
				self.getNextBooks();
			}
		});

		this.getNextBooks();
	},

	getNextBooks: function () {
		this.get('booksRepository').getBooksListPage(page++).then(books => {
			this.get('books').pushObjects(books);
			if (books.length === 0) {
				page--;
			}
		});
	}

});
