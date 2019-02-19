import User from '../models/user';
import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	ajax: inject(),
	session: inject(),
	usersRepository: inject(),

	init() {
    this._super(...arguments);
    this.user = this.items || [];
  },

	didInsertElement: function() {
		return this.get('session').fetch().catch(function() {
		});
	},

	actions: {
		signIn: function(provider) {
			let self = this;
			let usersRepo = this.get('usersRepository');

			this.get('session').open('firebase', {provider: provider}).then(authData => {
				usersRepo.isAuthorized(authData.currentUser.email).then(authorized => {
					if (!authorized) {
						self.get('session').close().then(() => {
							window.location.replace('/');
						});

						return;
					}

					let email = authData.currentUser.email;
					let displayName = authData.currentUser.displayName;
					let photoUrl = authData.currentUser.photoURL;

					usersRepo.getUserData(email, displayName).then(userData => {
						let user = new User(userData.id, displayName, email, photoUrl, userData.role);
						self.get('user').clear();
						self.get('user').pushObject(user);
					});
				});
			});
		}
	}

});