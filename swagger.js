const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'GBSites',
        description: 'API for creating, updating, and deleting information about museums and castles to visit in Great Britain'
    },
    host: '',
    schemes: ['http'],
};

const outputFile = 'swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);