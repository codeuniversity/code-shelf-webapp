import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	booksRepository: inject(),

	init: function () {
		this._super(...arguments);
		this.isbn = this.get('book').isbn;
		this.user = JSON.parse(window.localStorage.getItem('user'));

		if (this.get('booksRepository').exists(this.get('isbn'))) {
			this.availabilty = this.get('booksRepository').getBookByIsbn(this.get('isbn')).status;
			this.book = this.get('booksRepository').getBookByIsbn(this.get('isbn'));
		}
		else {
			this.availabilty = this.get('book').status;
			this.book = this.get('book');
		}
	},

	userIsAdmin: computed(function () {
		return this.get('user')._role === 'ADMIN';
	}),

	userIsWithBook: computed(function () {
		return this.get('user')._email === this.get('book').currentUser.email;
	}),

	bookExists: computed(function () {
		return this.get('booksRepository').exists(this.get('isbn'));
	}),

	bookIsAvailable: computed(function () {
		return this.get('availabilty') === "AVAILABLE";
	}),

	availabilityClass: computed(function () {
		if (this.get('availabilty') === "AVAILABLE") {
			return 'available-book';
		}
		else {
			return 'unavailable-book';
		}
	}),

	formattedStatus: computed(function () {
		return this.get('availabilty')
			.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');
	}),

	actions: {

		addBook: function() {
			let isbn = this.get('isbn');
			let user = this.get('user');

			this.get('booksRepository').addBook(isbn, user._id).then(response => {
				alert(response.title + ' added to library');
				// TODO style notification
				window.location.reload();
			}).catch(error => {
				console.log(error);
			});
		},

		checkoutBook: function () {
			let book = this.get('book');
			let user = this.get('user');

			this.get('booksRepository').checkout(book.id, user._id).then(() => {
				alert('checked out ' + book.title);
				// TODO style notification
				window.location.reload();
			});
		},

		returnBook: function () {
			let book = this.get('book');
			let user = this.get('user');

			this.get('booksRepository').returnBook(book.id, user._id).then(() => {
				alert('returned ' + book.title);
				// TODO style notification
				window.location.reload();
			});
		},

		addReview: function () {}

	}

});
