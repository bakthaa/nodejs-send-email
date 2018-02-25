
const fun = require('./index')
const express = require('express');
const bodyParser = require('body-parser');

const app  = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/wbss-send-msg', (req, res) => {

    fun.send(req, res)

})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
