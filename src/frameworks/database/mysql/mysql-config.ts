import * as dotenv from 'dotenv';

import { IMySqlConfig } from './interfaces/mysql-config.interface';
import entities from './index';

dotenv.config();

export const databaseConfig: IMySqlConfig = {
    development: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_DEVELOPMENT,
        entities,
        synchronize: true
    },
    test: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_TEST,
        entities,
        synchronize: true
    },
    production: {
        type: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME_PRO,
        entities
    }
}