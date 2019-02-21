import User from '../models/user';
import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	ajax: inject(),
	session: inject(),
	usersRepository: inject(),

	didInsertElement: function() {
		return this.get('session').fetch().catch(() => {});
	},

	actions: {
		signIn: function(provider) {
			let self = this;
			let usersRepo = this.get('usersRepository');

			this.get('session').open('firebase', {provider: provider}).then(authData => {
				let isAuthorized = usersRepo.isAuthorized(authData.currentUser.email);

				if (!isAuthorized) {
					self.get('session').close().then(() => {
						window.location.replace('/');
					});

					return;
				}
				else {
					let email = authData.currentUser.email;
					let displayName = authData.currentUser.displayName;
					let photoUrl = authData.currentUser.photoURL;
					let userData = usersRepo.getUserData(email, displayName);

					let user = new User(userData.id, displayName, email, photoUrl, userData.role);
					window.localStorage.setItem('user', JSON.stringify(user));
				}
			});
		}
	}

});