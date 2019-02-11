import $ from 'jquery';
import Ember from 'ember';
import { inject } from '@ember/service';
import Component from '@ember/component';
import ENV from 'code-shelf-webapp/config/environment';

export default Component.extend({
	session: inject(),
	ajax: inject(),

	didInsertElement: function() {
		return this.get('session').fetch().catch(function() {
		});
	},

	actions: {
		signIn: function(provider) {
			let self = this;

			this.get('session').open('firebase', {provider: provider}).then(authData => {
				self.get('ajax').request(ENV.AUTHORIZATION_CHECK_ENDPOINT + '/' + authData.currentUser.email).then(authorized => {
					let displayName = authData.currentUser.displayName;
					let email = authData.currentUser.email;
					let photoUrl = authData.currentUser.photoURL;

					if (!authorized) {
						self.get('session').close().then(() => {
							
						});
					}
				});
			});
		}
	}

});

