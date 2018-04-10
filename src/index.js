const express = require('express')
const app = express()
const path = require('path')

function templatePath(name) {
    return path.join(__dirname, "../templates", name);
}

app.get('/', (req, res) => {
    res.sendFile(templatePath("customer.html"));
});

app.get('/kitchen', (req, res) => {
    res.sendFile(templatePath("cook.html"));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))