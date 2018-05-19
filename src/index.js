const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const apiRouter = require('./api/api');
const bodyParser = require('body-parser');
require('./db');

function templatePath(name) {
    return path.join(__dirname, "../templates", name);
}

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(templatePath("customer.html"));
});

app.get('/kitchen', (req, res) => {
    res.sendFile(templatePath("cook.html"));
});

app.use('/api/v1/', apiRouter);



app.listen(3000, () => console.log('Example app listening on port 3000!'))