import AjaxService from 'ember-ajax/services/ajax';
import ENV from 'code-shelf-webapp/config/environment';

export default AjaxService.extend({
  host: ENV.SERVER_URL
});