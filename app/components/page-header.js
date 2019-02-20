import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	ajax: inject(),
	session: inject(),
	usersRepository: inject(),

	init: function() {
		this._super(...arguments);
		this.set('user', JSON.parse(window.localStorage.getItem('user')));
	},

	didInsertElement: function() {
		return this.get('session').fetch().catch(() => {});
	},

	actions: {
		signOut: function() {
      this.get('session').close();
      window.localStorage.removeItem('user');
    }
	}
});
