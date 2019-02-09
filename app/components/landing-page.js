
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

			this.get('session').open('firebase', {provider: provider}).then(function(authData) {
				self.get('ajax').request(ENV.AUTHORIZATION_CHECK_ENDPOINT + '/' + authData.currentUser.email).then(response => {
					let displayName = authData.currentUser.displayName;
					let email = authData.currentUser.email;
					let photoUrl = authData.currentUser.photoURL;

					console.log(displayName);
					console.log(email);
					console.log(photoUrl);
					console.log(response);
				});
			});
		},

		signOut: function() {
			this.get('session').close();
		}
	}

});

