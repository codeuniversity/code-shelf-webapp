import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	bookReviewsRepository: inject(),

	init: function () {
		this._super(...arguments);
		this.reviews = [];
	},

	didInsertElement: function () {
		let bookId = this.get('bookId');

		this.get('bookReviewsRepository').getReviews(bookId).then(reviews => {
			console.log(reviews);
		});
	}

});
