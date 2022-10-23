require('dotenv').config();
//const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./initializers/db'); 
const port = process.env.PORT || 8080;
//const swaggerAutogen = require('swagger-autogen')();

//middlewares -- function that executes when a specific route is being hit
app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB. Listening on http://localhost:${port}`);
    }
});




