import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

import { IMongoDataServices } from '../../../core/abstracts';
// import { RoutePlanning,FavoriteAddress, FavoriteAddressSchema, SearchAddress, SearchAddressHistoric, SearchAddressHistoricSchema, SearchAddressSchema, RoutePlanningSchema, RoutePlanningFavorite, RoutePlanningFavoriteSchema } from './models';
// import { Tracking, TrackingSchema } from './models';
import { MongoDataServices } from './mongo-data-services.service';

dotenv.config();

@Module({
    imports: [
        MongooseModule.forFeature([
            // { name: Tracking.name, schema: TrackingSchema },
            // { name: FavoriteAddress.name, schema: FavoriteAddressSchema },
            // { name: SearchAddressHistoric.name, schema: SearchAddressHistoricSchema },
            // { name: SearchAddress.name, schema: SearchAddressSchema },
            // { name: RoutePlanning.name, schema: RoutePlanningSchema },
            // { name: RoutePlanningFavorite.name, schema: RoutePlanningFavoriteSchema },
        ]),
        MongooseModule.forRoot(
            process.env.NODE_ENV == 'test' ? process.env.DB_URI_TEST : process.env.DB_URI
        ),
    ],
    providers: [
        {
            provide: IMongoDataServices,
            useClass: MongoDataServices,
        },
    ],
    exports: [IMongoDataServices],
})
export class MongoDataServicesModule { }