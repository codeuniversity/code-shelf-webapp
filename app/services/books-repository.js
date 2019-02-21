import Service from '@ember/service';
import { inject } from '@ember/service';
import ENV from 'code-shelf-webapp/config/environment';

export default Service.extend({
	ajax: inject(),

	addBook: function (isbn) {
		return this.get('ajax').post(ENV.BOOKS_ENDPOINT, { 
			data: {
				isbn: isbn
			}
		});
	},

	getBooksListPage: function (page) {
		return this.get('ajax').request(ENV.BOOKS_ENDPOINT + '/' + page);
	}

});