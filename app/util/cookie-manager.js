/* cookie manager */

export default {

  /**
   * Creates a cookie from the given parameters
   *
   * @param name Identifier for the cookie
   * @param value Value stored in the cookie
   * @param days Validity of the cookie in days
   */
  createCookie: function (name, value, days) {
    let expires = "";

    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
  },

  /**
   * Reads the value of a cookie
   *
   * @param name Identifier of the cookie
   * @returns The value stored in the cookie
   */
  readCookie: function (name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');

    for(let i=0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }

    return null;
  },

  /**
   * Deletes a cookie.
   *
   * @param name Identifier of the cookie to be deleted
   */
  deleteCookie: function (name) {
    this.createCookie(name,"",-1);
  },

  /**
   * Check if a cookie exists
   * @param name The identifier of the cookie to check for
   * @returns true of the cookie existssss
   */
  cookieExists: function (name) {
    return this.readCookie(name) !== null;
  }

}