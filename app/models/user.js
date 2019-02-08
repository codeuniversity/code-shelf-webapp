export default class User {

  constructor(id, displayName, email, photoUrl) {
    this._id = id;
    this._displayName = displayName;
    this._email = email;
    this._photoUrl = photoUrl;
  }

  get id() {
    return this._id;
  }

  set id(value) {
    this._id = value;
  }

  get displayName() {
    return this._displayName;
  }

  set displayName(value) {
    this._displayName = value;
  }

  get email() {
    return this._email;
  }

  set email(value) {
    this._email = value;
  }

  get photoUrl() {
    return this._photoUrl;
  }

  set photoUrl(value) {
    this._photoUrl = value;
  }

}