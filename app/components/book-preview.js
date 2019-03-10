import { inject } from '@ember/service';
import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
	booksRepository: inject(),

	isAdmin: computed(() => {
		let user = JSON.parse(window.localStorage.getItem('user'));
		return user._role === 'ADMIN';
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
		}

	}

});
