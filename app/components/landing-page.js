
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

			self.get('session').open('firebase', {provider: provider}).then(function(data) {
				let displayName = data.currentUser.displayName;
				let email = data.currentUser.email;
				let photoUrl = data.currentUser.photoURL;
				
				self.get('ajax').request(ENV.AUTHORIZATION_CHECK_ENDPOINT + '/' + email).then(response => {
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
