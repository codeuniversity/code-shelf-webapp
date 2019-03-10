import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	booksRepository: inject(),

	userIsAdmin: computed(() => {
		let user = JSON.parse(window.localStorage.getItem('user'));
		return user._role === 'ADMIN';
	}),

	bookExists: computed(function () {
		let isbn = this.get('book').isbn;
		return this.get('booksRepository').exists(isbn);
	}),

	bookIsAvailable: computed(function () {
		return this.get('book').status === 'AVAILABLE';
	}),

	availabilityClass: computed(function () {
		let availabilty = this.get('book').status;

		if (availabilty === "AVAILABLE") {
			return 'available-book';
		}
		else {
			return 'unavailable-book';
		}
	}),

	formattedStatus: computed(function () {
		return this.get('book')
			.status
			.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');
	}),

	actions: {

		addBook: function() {
			let user = JSON.parse(window.localStorage.getItem('user'));
			let isbn = this.get('book').isbn;

			this.get('booksRepository').addBook(isbn, user._id).then(response => {
				alert(response.title + ' added to library');
				// TODO style notification
			}).catch(error => {
				console.log(error);
			});
		},

		checkoutBook: function () {

		}

	}

});
