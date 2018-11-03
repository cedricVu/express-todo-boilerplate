'use strict';

import Path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import { swagger } from '../config/index';

/**
 * Swagger definition.
 */
const swaggerDefinition = {
    info: {
        title: swagger.APP_NAME,
        version: swagger.APP_VERSION,
        description: swagger.APP_DESCRIPTION
    },
    host: swagger.APP_HOST
};

/**
 * Options for the swagger docs.
 */
const swaggerOptions = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // Path to the API docs
    apis: [
        Path.join(__dirname, '/../routes/*.js'),
        Path.join(__dirname, '/../docs/*.js'),
        Path.join(__dirname, '/../docs/*.yml'),
        Path.join(__dirname, '/../docs/*.yaml')
    ]
};
export default class SwaggerController {
    static index = async (req, res) => {
        const swaggerSpec = swaggerJSDoc(swaggerOptions);
        return res.json(swaggerSpec);
    };

    static view = async (req, res) => {
        return res.render('swagger/index', { swaggerUrl: swagger.SWAGGER_URL });
    };
}