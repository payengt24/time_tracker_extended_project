const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(express.static('server/public'));

const pool = require ('./modules/pool')

var project = require('./routes/project');
var history = require('./routes/entry');

app.use('/project', project);

app.use('/entry', history);

app.listen(PORT, () => {
    console.log('listening on PORT', PORT);
});