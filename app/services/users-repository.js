import Ember from 'ember';
import { inject } from '@ember/service';
import ENV from 'code-shelf-webapp/config/environment';

export default Ember.Service.extend({
	ajax: inject(),

	isAuthorized: function(email) {
		return this.get('ajax').request(ENV.AUTHORIZATION_CHECK_ENDPOINT + '/' + email);
	}

});