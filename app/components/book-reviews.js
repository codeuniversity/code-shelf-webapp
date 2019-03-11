import $ from 'jquery';
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
			this.get('reviews').pushObjects(reviews);
		});
	},

	actions: {

		addReview: function () {
			let bookId = this.get('bookId');
			let user = JSON.parse(window.localStorage.getItem('user'));
			let review = $('#review-input-area').val();

			if (review) {
				this.get('bookReviewsRepository').addReview(bookId, user._id, review).then((reviews) => {
					this.set('reviews', []);
					this.get('reviews').pushObjects(reviews);
					$('#review-input-area').val('');
				});
			}
		}

	}

});
