require('dotenv').config();
var Mailler = require('./mailler');
var Auth = require('./auth');
var {
  text64, randNum
} = require('./util');

const auth = new Auth(process.env);
const mailler = new Mailler(process.env);

/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.helloWorld = (req, res) => {

  const randNo = randNum();
  console.log(randNo, 'Inbound :', req.connection.remoteAddress);
  try {

    if (req.method && 'POST' === req.method.toUpperCase() && req.body.raw) {
      console.log(randNo, '=', req.body.raw);

      auth.authorize(req.headers.key, (status, error) => {

        if (error) {

          logError(error.message, randNo);
          res.status(401).send(error.message);
        }
        if (status) {

          mailler.send(text64(req.body.raw), (error, info) => {

            if (error) {
              logError(error.message, randNo);
            }
            if (info) {

              console.log(randNo, info.response);
            }
          });
          res.status(200).send();
        }
      })
    } else {

      res.status(400).send('Invalid Args!');
    }
  } catch(e) {

    logError(e, randNo);
    res.status(500).send('Error');
  }

};

function logError(msg, id) {

  console.log('ERROR [', id, '] :', msg);
}
