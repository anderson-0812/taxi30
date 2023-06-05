import {
    Person, Account, Profile, RefreshToken /*, Place, Parking, Square, SquareFraction, RelocatedSquare, Vehicle, Notification, NotificationType,
    Blurd, MethodPayment, Travel, TravelType, Group, Member, Point, Passenger, Stop, Service, PanicButtom, Routes, PersonService,
    Command, EquipmentType, Equipment, LastTracking, Score, Platform, NotificationPerson, MethodEntry,
    PersonPlace, Tag, TagPlace, SummaryTravel, GroupModule, Module, Gate, GateType, TravelRecurrent*/
} from "../entities";
import { IGenericRepository } from "./mysql-generic-repository.abstract";

export abstract class IDataServices {
    abstract people: IGenericRepository<Person>;
    abstract accounts: IGenericRepository<Account>;
    abstract profiles: IGenericRepository<Profile>;
    abstract refreshToken: IGenericRepository<RefreshToken>;
    /*
    abstract groupModules: IGenericRepository<GroupModule>;
    abstract modules: IGenericRepository<Module>;
    abstract places: IGenericRepository<Place>;
    abstract parkings: IGenericRepository<Parking>;
    abstract squares: IGenericRepository<Square>;
    abstract squareFractions: IGenericRepository<SquareFraction>;
    abstract relocatedSquares: IGenericRepository<RelocatedSquare>;
    abstract vehicles: IGenericRepository<Vehicle>;
    abstract notifications: IGenericRepository<Notification>;
    abstract notificationTypes: IGenericRepository<NotificationType>;
    abstract notificationPersons: IGenericRepository<NotificationPerson>;
    abstract blurds: IGenericRepository<Blurd>;
    abstract methodPayments: IGenericRepository<MethodPayment>;
    abstract travels: IGenericRepository<Travel>;
    abstract travelTypes: IGenericRepository<TravelType>;
    abstract groups: IGenericRepository<Group>;
    abstract members: IGenericRepository<Member>;
    abstract points: IGenericRepository<Point>;
    abstract passengers: IGenericRepository<Passenger>;
    abstract stops: IGenericRepository<Stop>;
    abstract services: IGenericRepository<Service>;
    abstract personServices: IGenericRepository<PersonService>;
    abstract personPlaces: IGenericRepository<PersonPlace>;
    abstract panicButtom: IGenericRepository<PanicButtom>;
    abstract routes: IGenericRepository<Routes>;
    abstract commands: IGenericRepository<Command>;
    abstract equipmentTypes: IGenericRepository<EquipmentType>;
    abstract equipments: IGenericRepository<Equipment>;
    abstract lastTrackings: IGenericRepository<LastTracking>;
    abstract scores: IGenericRepository<Score>;
    abstract platforms: IGenericRepository<Platform>;
    abstract methodEntries: IGenericRepository<MethodEntry>;
    abstract summaryTravels: IGenericRepository<SummaryTravel>;
    abstract tags: IGenericRepository<Tag>;
    abstract tagPlaces: IGenericRepository<TagPlace>;
    abstract gates: IGenericRepository<Gate>;
    abstract gateTypes: IGenericRepository<GateType>;
    abstract travelRecurrents: IGenericRepository<TravelRecurrent>;
    */
}