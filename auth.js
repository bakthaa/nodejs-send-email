'use strict';

class Auth {

  constructor(env) {
    this.env = env;
  }

  authorize(token, callback) {
    if (token) {
      let key = token.replace(/^Basic/, '');
      if (this.env.KEY === key) {
        callback(true);
        return;
      }
    }
    callback(false, new Error('Access Denied'));
  }
}
module.exports = Auth;
