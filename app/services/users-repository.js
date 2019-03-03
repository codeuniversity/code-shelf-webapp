import Service from '@ember/service';
import { inject } from '@ember/service';
import ENV from 'code-shelf-webapp/config/environment';

export default Service.extend({
	ajax: inject(),

	exists: function(email) {
		return this.get('ajax').request(ENV.USER_EXISTENCE_ENDPOINT + '/' + email);
	},

	isAuthorized: function(email) {
		return this.get('ajax').request(ENV.AUTHORIZATION_ENDPOINT + '/' + email);
	},

	getUserData: function(email, displayName) {
		return this.get('ajax').request(ENV.USER_DATA_ENDPOINT, {
			method: 'GET',
			data: {
				'email': email,
				'displayName': displayName
			}
		});
	}

});