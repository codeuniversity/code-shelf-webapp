
import { inject } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
	session: inject(),

	didInsertElement: function() {
		return this.get('session').fetch().catch(function() {
		});
	},

	actions: {
		signIn: function(provider) {
			this.get('session').open('firebase', {provider: provider}).then(function(data) {
				alert(data.currentUser);
			});
		}
	}

});
