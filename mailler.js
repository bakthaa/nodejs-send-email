'use strict';
var nodemailer = require("nodemailer");
var {
  text64
} = require('./util');

class Mailler {

  constructor(env) {

    const mailConfig = {

      host: env.HOST_NAME,
      port: env.HOST_PORT,
      secure: true,
      auth: {
        user: env.HOST_USER_NAME,
        pass: text64(env.HOST_PASS)
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      },
      logger: true,
      debug: false // include SMTP traffic in the logs
    };

    const senderInfo = {
      // default message fields
      // sender info
      from: env.EMAIL_FROM,
      headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
      }
    }

    // Create a SMTP transporter object
    this._transporter = nodemailer.createTransport(mailConfig, senderInfo);
  }

  send(msgStr, callback) {

    const message = this.toMsgObject(msgStr);
    if (this.isValidMsg(message)) {

      this._transporter.sendMail(message, callback);
      return;
    }
    callback(new Error('Invalid Message'));
  }

  isValidMsg(msgData) {

    return (msgData && msgData.to && msgData.subject && msgData.text);
  }

  toMsgObject(msgStr) {
    try {

      return JSON.parse(msgStr);
    } catch (e) {
      // console.log(e);
      return;
    }
  }

}
module.exports = Mailler;
