import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { IMongoDataServices} from "../../../core/abstracts";
// import { RoutePlanning,FavoriteAddress, FavoriteAddressDocument, Tracking, TrackingDocument, SearchAddress, SearchAddressHistoric, SearchAddressDocument, SearchAddressHistoricDocument, RoutePlanningFavorite, RoutePlanningDocument, RoutePlanningFavoriteDocument } from "./models";
import { MongoGenericRepository } from "./mongo-generic-repository";

@Injectable()
export class MongoDataServices implements IMongoDataServices, OnApplicationBootstrap {
    // trackings: MongoGenericRepository<Tracking>;
    // favoriteAddress: MongoGenericRepository<FavoriteAddress>;
    // searchAddress: MongoGenericRepository<SearchAddress>;
    // searchAddressHistoric: MongoGenericRepository<SearchAddressHistoric>;
    // routePlanning: MongoGenericRepository<RoutePlanning>;
    // routePlanningFavorite: MongoGenericRepository<RoutePlanningFavorite>;
    
    constructor(
        // @InjectModel(Tracking.name)
        // private trackingRepository: Model<Tracking>,
        // @InjectModel(FavoriteAddress.name)
        // private favoriteAddressRepository: Model<FavoriteAddress>,
        // @InjectModel(SearchAddress.name)
        // private searchAdressRepository: Model<SearchAddress>,
        // @InjectModel(SearchAddressHistoric.name)
        // private searchAdressHistoricRepository: Model<SearchAddressHistoric>,
        // @InjectModel(RoutePlanning.name)
        // private routePlanningRepository: Model<RoutePlanning>,
        // @InjectModel(RoutePlanningFavorite.name)
        // private routePlanningFavoriteRepository: Model<RoutePlanningFavorite>
    ) { }

    onApplicationBootstrap() {
        // this.trackings = new MongoGenericRepository<Tracking>(this.trackingRepository);
        // this.favoriteAddress = new MongoGenericRepository<FavoriteAddress>(this.favoriteAddressRepository);
        // this.searchAddress = new MongoGenericRepository<SearchAddress>(this.searchAdressRepository);
        // this.searchAddressHistoric = new MongoGenericRepository<SearchAddressHistoric>(this.searchAdressHistoricRepository);
        // this.routePlanning = new MongoGenericRepository<RoutePlanning>(this.routePlanningRepository);
        // this.routePlanningFavorite = new MongoGenericRepository<RoutePlanningFavorite>(this.routePlanningFavoriteRepository);
    }
}