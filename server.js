require('dotenv').config();
const express = require('express');
const app = express();
const mongodb = require('./initializers/db'); 
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

//middlewares -- function that executes when a specific route is being hit
app
    .use(bodyParser.json())
    .use((req, res, next) => {
        //res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));



//routes
app.get('/', (req, res) => {
    res.send('A place to visit');
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB. Listening on http://localhost:${port}`);
    }
});




