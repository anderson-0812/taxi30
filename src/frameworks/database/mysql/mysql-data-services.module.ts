import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { IDataServices } from "../../../core/abstracts";
import { databaseConfig } from "./mysql-config";
import { MySqlDataServices } from "./mysql-services.service";
import entities from './index';

let config;
switch (process.env.NODE_ENV) {
    case 'development':
        config = databaseConfig.development;
        break;
    case 'test':
        config = databaseConfig.test;
        break;
    case 'production':
        config = databaseConfig.production;
        break;
    default:
        config = databaseConfig.development;
}

@Module({
    imports: [
        TypeOrmModule.forFeature(entities),
        TypeOrmModule.forRoot(config)
    ],
    providers: [
        {
            provide: IDataServices,
            useClass: MySqlDataServices
        }
    ],
    exports: [IDataServices, TypeOrmModule]
})
export class MysqlDataServicesModule { }