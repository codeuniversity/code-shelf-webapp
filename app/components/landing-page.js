import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	ajax: inject(),
	session: inject(),
	usersRepository: inject(),

	didInsertElement: function() {
		return this.get('session').fetch().catch(function() {
		});
	},

	actions: {
		signIn: function(provider) {
			let self = this;

			this.get('session').open('firebase', {provider: provider}).then(authData => {
				self.get('usersRepository').isAuthorized(authData.currentUser.email).then(authorized => {
					let displayName = authData.currentUser.displayName;
					let email = authData.currentUser.email;
					let photoUrl = authData.currentUser.photoURL;

					if (!authorized) {
						self.get('session').close().then(() => {
							// TODO make this more ux friendly
							alert('Access Denied.');
						});

						return;
					}

					console.log(displayName + email + photoUrl);
				});
			});
		}
	}

});