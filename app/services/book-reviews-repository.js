import Service from '@ember/service';
import { inject } from '@ember/service';
import ENV from 'code-shelf-webapp/config/environment';

export default Service.extend({
	ajax: inject(),

	getReviews: function (bookId) {
		return this.get('ajax').request(ENV.BOOK_REVIEWS_ENDPOINT + bookId);
	},

	addReview: function (bookId, reviewerId, review) {
		return this.get('ajax').post(ENV.BOOK_REVIEWS_ENDPOINT, {
			data: {
				bookId: bookId,
				reviewerId: reviewerId,
				review: review
			}
		});
	}

});