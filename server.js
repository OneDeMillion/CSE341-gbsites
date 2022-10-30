require('dotenv').config();
//const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { auth, requiresAuth } = require('express-openid-connect');
const mongodb = require('./initializers/db'); 
//const { graphql } = require('graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 8080;
const { graphqlHTTP } = require('express-graphql');

//const swaggerAutogen = require('swagger-autogen')();

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
  });


//middlewares -- function that executes when a specific route is being hit
app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));


app
    .use('/graphql', graphqlHTTP({
        //directs express-graphql to use this schema to map out the graph
        schema,
        //direct express-graphql to use graphiql when goto '/graphql' address in the browser 
        //which provides an interface to make GraphQl queries
        graphiql:true
}));
    

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




