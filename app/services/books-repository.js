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

	getBookByIsbn: function(isbn) {
		return $.parseJSON($.ajax({
				type: 'GET',
				url: ENV.SERVER_URL + ENV.BOOK_DATA_BY_ISBN_ENPOINT + '/' + isbn,
				async: false
			}).responseText
		);
	},

	getBookSync: function (id) {
		return $.parseJSON($.ajax({
				type: 'GET',
				url: ENV.SERVER_URL + ENV.BOOKS_ENDPOINT + '/' + id,
				async: false
			}).responseText
		);
	},

	exists: function(isbn) {
		return $.parseJSON($.ajax({
				type: 'GET',
				url: ENV.SERVER_URL + ENV.BOOK_EXISTENCE_ENDPOINT + '/' + isbn,
				async: false
			}).responseText
		);
	},

	getPreview: function(isbn) {
		return $.parseJSON($.ajax({
				type: 'GET',
				url: ENV.SERVER_URL + ENV.BOOK_PREVIEW_ENPOINT + '/' + isbn,
				async: false
			}).responseText
		);
	}

});