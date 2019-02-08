import Component from '@ember/component';
import { inject } from '@ember/service';

export default Component.extend({
	session: inject(),

	didInsertElement: function() {
		return this.get('session').fetch().catch(function() {
		});
	},

	actions: {
		signIn: function(provider) {
			this.get('session').open('firebase', {provider: provider}).then(function(data) {
				console.log(data.currentUser);
			});
		},

		signOut: function() {
      this.get('session').close();
    }
	}

});
