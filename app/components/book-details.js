import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

	availabilityClass: computed(function () {
		let availabilty = this.get('book').status;

		if (availabilty === "AVAILABLE") {
			return 'available-book';
		}
		else {
			return 'unavailable-book';
		}
	}),

	formattedStatus: computed(function () {
		return this.get('book')
			.status
			.toLowerCase()
			.split(' ')
			.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
			.join(' ');
	})

});
