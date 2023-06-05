import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IDataServices } from "../../../core/abstracts";
import { MySqlGenericRepository } from "./mysql-generic.repository";
import {
    Person, Account, Profile, RefreshToken /*, Place, Parking, Square, SquareFraction, RelocatedSquare, Vehicle, Notification,
    NotificationType, Blurd, MethodPayment, Travel, TravelType, Group, Member, Point, Passenger, Stop, Service, PersonService,
    PanicButtom, Routes, Command, EquipmentType, Equipment, LastTracking, Score, 
    Platform, NotificationPerson, MethodEntry, PersonPlace, Tag, TagPlace, SummaryTravel, GroupModule, Module, Gate, GateType,
    TravelRecurrent*/
} from "./models";

import {
    defaultEquipmentTypes, defaultGateTypes, defaultGroupModules, defaultMethodEntries, defaultMethodPayment,
    defaultPlatforms, defaultProfiles, defaultServices, defaultTravelTypes
} from "./mysql-default-items";
@Injectable()
export class MySqlDataServices implements IDataServices, OnApplicationBootstrap {
    people: MySqlGenericRepository<Person>;
    accounts: MySqlGenericRepository<Account>;
    profiles: MySqlGenericRepository<Profile>;
    refreshToken: MySqlGenericRepository<RefreshToken>;
    /*
    groupModules: MySqlGenericRepository<GroupModule>;
    modules: MySqlGenericRepository<Module>;
    places: MySqlGenericRepository<Place>;
    parkings: MySqlGenericRepository<Parking>;
    squares: MySqlGenericRepository<Square>;
    squareFractions: MySqlGenericRepository<SquareFraction>;
    relocatedSquares: MySqlGenericRepository<RelocatedSquare>;
    vehicles: MySqlGenericRepository<Vehicle>;
    notifications: MySqlGenericRepository<Notification>;
    notificationTypes: MySqlGenericRepository<NotificationType>;
    notificationPersons: MySqlGenericRepository<NotificationPerson>;
    blurds: MySqlGenericRepository<Blurd>;
    methodPayments: MySqlGenericRepository<MethodPayment>;
    travels: MySqlGenericRepository<Travel>;
    travelTypes: MySqlGenericRepository<TravelType>;
    groups: MySqlGenericRepository<Group>;
    members: MySqlGenericRepository<Member>;
    points: MySqlGenericRepository<Point>;
    passengers: MySqlGenericRepository<Passenger>;
    stops: MySqlGenericRepository<Stop>;
    services: MySqlGenericRepository<Service>;
    personServices: MySqlGenericRepository<PersonService>;
    panicButtom: MySqlGenericRepository<PanicButtom>;
    routes: MySqlGenericRepository<Routes>;
    commands: MySqlGenericRepository<Command>;
    equipmentTypes: MySqlGenericRepository<EquipmentType>;
    equipments: MySqlGenericRepository<Equipment>;
    lastTrackings: MySqlGenericRepository<LastTracking>;
    scores: MySqlGenericRepository<Score>;
    platforms: MySqlGenericRepository<Platform>;
    methodEntries: MySqlGenericRepository<MethodEntry>;
    personPlaces: MySqlGenericRepository<PersonPlace>;
    tags: MySqlGenericRepository<Tag>;
    tagPlaces: MySqlGenericRepository<TagPlace>;
    summaryTravels: MySqlGenericRepository<SummaryTravel>;
    gates: MySqlGenericRepository<Gate>;
    gateTypes: MySqlGenericRepository<GateType>;
    travelRecurrents: MySqlGenericRepository<TravelRecurrent>;
    */

    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
        @InjectRepository(Profile)
        private profileRepository: Repository<Profile>,
        /*
        @InjectRepository(GroupModule)
        private groupModuleRepository: Repository<GroupModule>,
        @InjectRepository(Module)
        private moduleRepository: Repository<Module>,
        @InjectRepository(Place)
        private placeRepository: Repository<Place>,
        @InjectRepository(Parking)
        private parkingRepository: Repository<Parking>,
        @InjectRepository(Square)
        private squareRepository: Repository<Square>,
        @InjectRepository(SquareFraction)
        private squareFractionRepository: Repository<SquareFraction>,
        @InjectRepository(RelocatedSquare)
        private relocatedSquareRepository: Repository<RelocatedSquare>,
        @InjectRepository(Vehicle)
        private vehicleRepository: Repository<Vehicle>,
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
        @InjectRepository(NotificationType)
        private notificationTypeRepository: Repository<NotificationType>,
        @InjectRepository(NotificationPerson)
        private notificationPersonRepository: Repository<NotificationPerson>,
        @InjectRepository(Blurd)
        private blurdRepository: Repository<Blurd>,
        @InjectRepository(MethodPayment)
        private methodPaymentRepository: Repository<MethodPayment>,
        @InjectRepository(Travel)
        private travelRepository: Repository<Travel>,
        @InjectRepository(TravelType)
        private travelTypesRepository: Repository<TravelType>,
        @InjectRepository(Group)
        private groupRepository: Repository<Group>,
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
        @InjectRepository(Point)
        private pointRepository: Repository<Point>,
        @InjectRepository(Passenger)
        private passengerRepository: Repository<Passenger>,
        @InjectRepository(Stop)
        private stopRepository: Repository<Stop>,
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
        @InjectRepository(PersonService)
        private personServiceRepository: Repository<PersonService>,
        @InjectRepository(PanicButtom)
        private panicButtomRepository: Repository<PanicButtom>,
        @InjectRepository(Routes)
        private routesRepository: Repository<Routes>,
        @InjectRepository(Command)
        private commandRepository: Repository<Command>,
        @InjectRepository(EquipmentType)
        private equipmentTypeRepository: Repository<EquipmentType>,
        @InjectRepository(Equipment)
        private equipmentRepository: Repository<Equipment>,
        @InjectRepository(RefreshToken)
        private refreshTokenRepository: Repository<RefreshToken>,
        @InjectRepository(LastTracking)
        private lastTrackingRepository: Repository<LastTracking>,
        @InjectRepository(Score)
        private scoreRepository: Repository<Score>,
        @InjectRepository(Platform)
        private platformRepository: Repository<Platform>,
        @InjectRepository(MethodEntry)
        private methodEntryRepository: Repository<MethodEntry>,
        @InjectRepository(PersonPlace)
        private personPlaceRepository: Repository<PersonPlace>,
        @InjectRepository(Tag)
        private tagRepository: Repository<Tag>,
        @InjectRepository(TagPlace)
        private tagPlaceRepository: Repository<TagPlace>,
        @InjectRepository(SummaryTravel)
        private summaryTravelsRepository: Repository<SummaryTravel>,
        @InjectRepository(Gate)
        private gateRepository: Repository<Gate>,
        @InjectRepository(GateType)
        private gateTypeRepository: Repository<GateType>,
        @InjectRepository(TravelRecurrent)
        private travelRecurrentRepository: Repository<TravelRecurrent>
        */
    ) { }

    async onApplicationBootstrap() {
        this.people = new MySqlGenericRepository<Person>(this.personRepository);
        this.accounts = new MySqlGenericRepository<Account>(this.accountRepository);
        this.profiles = new MySqlGenericRepository<Profile>(this.profileRepository);
        /*
        this.groupModules = new MySqlGenericRepository<GroupModule>(this.groupModuleRepository);
        this.modules = new MySqlGenericRepository<Module>(this.moduleRepository);
        this.places = new MySqlGenericRepository<Place>(this.placeRepository);
        this.parkings = new MySqlGenericRepository<Parking>(this.parkingRepository);
        this.squares = new MySqlGenericRepository<Square>(this.squareRepository);
        this.squareFractions = new MySqlGenericRepository<SquareFraction>(this.squareFractionRepository);
        this.relocatedSquares = new MySqlGenericRepository<RelocatedSquare>(this.relocatedSquareRepository);
        this.vehicles = new MySqlGenericRepository<Vehicle>(this.vehicleRepository);
        this.notifications = new MySqlGenericRepository<Notification>(this.notificationRepository);
        this.notificationTypes = new MySqlGenericRepository<NotificationType>(this.notificationTypeRepository);
        this.notificationPersons = new MySqlGenericRepository<NotificationPerson>(this.notificationPersonRepository);
        this.blurds = new MySqlGenericRepository<Blurd>(this.blurdRepository);
        this.methodPayments = new MySqlGenericRepository<MethodPayment>(this.methodPaymentRepository);
        this.travels = new MySqlGenericRepository<Travel>(this.travelRepository);
        this.travelTypes = new MySqlGenericRepository<TravelType>(this.travelTypesRepository);
        this.groups = new MySqlGenericRepository<Group>(this.groupRepository);
        this.members = new MySqlGenericRepository<Member>(this.memberRepository);
        this.points = new MySqlGenericRepository<Point>(this.pointRepository);
        this.passengers = new MySqlGenericRepository<Passenger>(this.passengerRepository);
        this.stops = new MySqlGenericRepository<Stop>(this.stopRepository);
        this.services = new MySqlGenericRepository<Service>(this.serviceRepository);
        this.personServices = new MySqlGenericRepository<PersonService>(this.personServiceRepository);
        this.panicButtom = new MySqlGenericRepository<PanicButtom>(this.panicButtomRepository);
        this.routes = new MySqlGenericRepository<Routes>(this.routesRepository);
        this.commands = new MySqlGenericRepository<Command>(this.commandRepository);
        this.equipmentTypes = new MySqlGenericRepository<EquipmentType>(this.equipmentTypeRepository);
        this.equipments = new MySqlGenericRepository<Equipment>(this.equipmentRepository);
        this.refreshToken = new MySqlGenericRepository<RefreshToken>(this.refreshTokenRepository);
        this.lastTrackings = new MySqlGenericRepository<LastTracking>(this.lastTrackingRepository);
        this.scores = new MySqlGenericRepository<Score>(this.scoreRepository);
        this.platforms = new MySqlGenericRepository<Platform>(this.platformRepository);
        this.methodEntries = new MySqlGenericRepository<MethodEntry>(this.methodEntryRepository);
        this.personPlaces = new MySqlGenericRepository<PersonPlace>(this.personPlaceRepository);
        this.tags = new MySqlGenericRepository<Tag>(this.tagRepository);
        this.tagPlaces = new MySqlGenericRepository<TagPlace>(this.tagPlaceRepository);
        this.summaryTravels = new MySqlGenericRepository<SummaryTravel>(this.summaryTravelsRepository);
        this.gates = new MySqlGenericRepository<Gate>(this.gateRepository);
        this.gateTypes = new MySqlGenericRepository<GateType>(this.gateTypeRepository);
        this.travelRecurrents = new MySqlGenericRepository<TravelRecurrent>(this.travelRecurrentRepository);
        */

        /*
        // Grupo de módulos por defecto
        await this.groupModuleRepository.save(defaultGroupModules);

        // Métodos de Pago por defecto
        await this.methodPaymentRepository.save(defaultMethodPayment);

        // Métodos de Entrada por defecto
        await this.methodEntryRepository.save(defaultMethodEntries);

        // Plataformas por defecto
        await this.platformRepository.save(defaultPlatforms);

        // Servicios por defecto
        await this.serviceRepository.save(defaultServices);

        // Perfiles por defecto
        await this.profileRepository.save(defaultProfiles);

        // Tipos de viaje por defecto
        await this.travelTypesRepository.save(defaultTravelTypes);

        // Tipos de Equipo por defecto
        await this.equipmentTypeRepository.save(defaultEquipmentTypes);

        // Tipos de Acceso por defecto
        await this.gateTypeRepository.save(defaultGateTypes); 
        */
    }
}