import $ from 'jquery';
import Service from '@ember/service';
import { inject } from '@ember/service';
import ENV from 'code-shelf-webapp/config/environment';

export default Service.extend({
	ajax: inject(),

	getReviews: (bookId => {
		return $.parseJSON($.ajax({
				type: 'GET',
				url: ENV.SERVER_URL + ENV.BOOK_REVIEWS_ENDPOINT + '/' + bookId,
				async: false
			}).responseText
		);
	}),

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