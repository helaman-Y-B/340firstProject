const swaggerAuto = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Image and users API',
        description: 'An API to display a list images dowloaded and users created.'
    },
    //host: 'localhost:8080',
    host: 'solid-computing-machine-67p9r5wv65x2r7p9-8080.app.github.dev',
    //host: 'three40firstproject.onrender.com',
    //schemes: ['https']
    schemes: ['http']
}

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAuto(outputFile, routes, doc);