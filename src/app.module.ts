import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';

// import { AppService } from './app.service';

import { AuthController } from './controllers/auth.controller';
import { PersonController } from './controllers/person.controller';
import { ProfileController } from './controllers/profile.controller';
import { RefreshTokenController } from './controllers/refresh_token.controller';




import { AuthServicesModule } from './services/auth-services.module';
import { DataServicesModule } from './services/database-services.module';

// import { PersonServiceUseCasesModule } from './use-cases/person_services';


import { AccountUseCasesModule } from './use-cases/accounts';
import { AuthUseCasesModule } from './use-cases/auth';
import { PersonUseCasesModule } from './use-cases/people';
import { ProfileUseCasesModule } from './use-cases/profiles';
import { RefreshTokenUseCasesModule } from './use-cases/refresh-token';
import { CleanMemoryRamProvider } from './use-cases/cleanMemoryRam/clean_memory_ram-factory.service';





@Module({
  imports: [
    ScheduleModule.forRoot(),
    DataServicesModule,
    AuthServicesModule,
    // EventServicesModule,
    AuthUseCasesModule,
    PersonUseCasesModule,
    AccountUseCasesModule,
    ProfileUseCasesModule,
    RefreshTokenUseCasesModule,
    /*
    GroupModuleUseCasesModule,
    ModuleUseCasesModule,
    PlaceUseCasesModule,
    PlaceServicesModule,
    NotificationServicesModule,
    PanicButtonServicesModule,
    ParkingUseCasesModule,
    ParkingServicesModule,
    SquareUseCasesModule,
    SquareServicesModule,
    SquareFractionUseCasesModule,
    VehicleUseCasesModule,
    NotificationUseCasesModule,
    NotificationTypeUseCasesModule,
    NotificationPersonUseCasesModule,
    BlurdUseCasesModule,
    TravelUseCasesModule,
    TravelTypeUseCasesModule,
    TravelServicesModule,
    GroupUseCasesModule,
    GroupServicesModule,
    MemberUseCasesModule,
    PointUseCasesModule,
    PassengerUseCasesModule,
    StopUseCasesModule,
    ServiceUseCasesModule,
    PersonServiceUseCasesModule,
    SearchAddressUseCasesModule,
    SearchAddressHistoricUseCasesModule,
    FavoriteAddressUseCasesModule,
    RoutePlanningUseCasesModule,
    RoutePlanningFavoriteUseCasesModule,
    PanicButtomUseCasesModule,
    NodemailerServicesModule,
    CommandUseCasesModule,
    EquipmentTypeUseCasesModule,
    EquipmentUseCasesModule,
    PanicButtomUseCasesModule,
    LastTrackingUseCasesModule,
    TrackingUseCasesModule,
    ScoreUseCasesModule,
    SquareFractionServicesModule,
    MethodEntryUseCasesModule,
    PersonPlaceUseCasesModule,
    TagUseCasesModule,
    SummaryTravelUseCasesModule,
    GateUseCasesModule,
    GateServicesModule,
    GateTypeUseCasesModule,
    TravelRecurrentUseCasesModule
    */
  ],
  controllers: [
    AuthController,
    RefreshTokenController,
    PersonController,
    /*
    AccountController,
    ProfileController,
    GroupModuleController,
    ModuleController,
    PlaceController,
    ParkingController,
    SquareController,
    SquareFractionController,
    VehicleController,
    NotificationController,
    NotificationTypeController,
    NotificationPersonController,
    BlurdController,
    TravelController,
    TravelTypeController,
    GroupController,
    FavoriteAddressController,
    SearchAddressController,
    RoutePlanningController,
    RoutePlanningFavoriteController,
    ServiceController,
    PersonServiceController,
    CommandController,
    EquipmentTypeController,
    EquipmentController,
    PanicButtomController,
    MethodEntryController,
    PersonPlaceController,
    TagController,
    GateController,
    GateTypeController,
    MemberController
    */
  ],
  providers: [
    CleanMemoryRamProvider
  ],
})
export class AppModule {}
