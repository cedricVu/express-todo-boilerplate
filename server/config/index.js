import DotENV from 'dotenv';
import DB from './db';
import swagger from './swagger-config.json';

DotENV.config();

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '5555';


module.exports = {
    env,
    port,
    DB: DB[env],
    swagger: swagger[env]
};

