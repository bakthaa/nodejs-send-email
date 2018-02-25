'use strict';
exports.base64 = function (txt) {

  return new Buffer(txt).toString('base64');
};

exports.text64 = function (encTxt) {

  return (encTxt)? new Buffer(encTxt, 'base64').toString('ascii'):'';
};

exports.randNum = function () {
  return Math.floor(Math.random() * 100000000000000);
};
