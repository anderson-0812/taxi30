import { Module } from '@nestjs/common';

import { MongoDataServicesModule } from '../frameworks/database/mongo/mongo-data-services.module';
import { MysqlDataServicesModule } from '../frameworks/database/mysql/mysql-data-services.module';

@Module({
    imports: [MysqlDataServicesModule,MongoDataServicesModule],
    exports: [MysqlDataServicesModule,MongoDataServicesModule]
})
export class DataServicesModule { }