const swaggerJSDoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
dotenv.config();
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Dataseer interview',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from Backend.',

    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}`,
            description: 'Dataseer Interview server',
        },
    ],
    components: {
        securitySchemes: {
            jwt: {
                type: "http",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT"
            },
        }
    },
    tags: [
        {
            name: 'File Operations'
        },

    ],
    security: [{
        jwt: []
    }]


};

const options = {
    swaggerDefinition,

    apis: [
        './routes/FileRoutes.js',
    ],
};
module.exports.swaggerSpec = () => {
    return swaggerJSDoc(options)
}


