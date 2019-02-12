import Service from '@ember/service';
import { inject } from '@ember/service';
import ENV from 'code-shelf-webapp/config/environment';

export default Service.extend({
	ajax: inject(),

	exists: function(email) {
		return this.get('ajax').request(ENV.EXISTENCE_ENDPOINT + '/' + email);
	},

	isAuthorized: function(email) {
		return this.get('ajax').request(ENV.AUTHORIZATION_ENDPOINT + '/' + email);
	}

});