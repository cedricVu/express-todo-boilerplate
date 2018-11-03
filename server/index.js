'use strict';
import Express from 'express';
import BodyParser from 'body-parser';
import Cors from 'cors';
import FS from 'fs';
import Http from 'http';
import Path from 'path';
import Helmet from 'helmet';
import Logger from './helpers/logger';
import Compress from 'compression';
import MethodOverride from 'method-override';
import {port, DB} from './config';
import { connect } from './models';
import * as ErrorHandler from '../server/middlwares/error'

const app = Express();
app
    .use(Cors())
    .use(Compress())
    .use(MethodOverride())
    .use(BodyParser.json())
    .use(BodyParser.urlencoded({extended: true}))
    .use(Express.static(Path.resolve(__dirname, '..', 'public'), {maxAge: 31557600000}))
    .use(Helmet())
    .set('views', Path.join(__dirname, '..', 'public', 'views'))
    .set('view engine', 'ejs');

const router = Express.Router();
const routePath = `${__dirname}/routes/v1`;
FS.readdir(routePath, (e, fileNames) => {
    if (e) {
        Logger.error(new Error(e));
    } else {
        for (const fileName of fileNames) {
            require(`${routePath}/${fileName}`)(app, router);
        }
        app.get('/favicon.ico', (req, res) => res.status(204));
        app.use(router);
        app.use(ErrorHandler.converter);
        app.use(ErrorHandler.notFound);
    }
});

connect(DB);
Http.createServer(app).listen(port, () => {
    console.log(`App listening on ${port}!`);
});

module.exports = app;
