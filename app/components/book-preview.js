import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  isAdmin: computed(() => {
    let user = JSON.parse(window.localStorage.getItem('user'));
    return user._role === 'ADMIN';
  })

});
