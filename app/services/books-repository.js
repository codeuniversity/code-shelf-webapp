import $ from 'jquery';
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
		return this.get('ajax').request(ENV.BOOKS_ENDPOINT + '/page/' + page);
	},

	getBook: function (id) {
		return this.get('ajax').request(ENV.BOOKS_ENDPOINT + '/' + id);
	},

	getBookSync: function (id) {
		return $.parseJSON($.ajax({
				type: 'GET',
				url: ENV.SERVER_URL + ENV.BOOKS_ENDPOINT + '/' + id,
				async: false
			}).responseText
		);
	}

});