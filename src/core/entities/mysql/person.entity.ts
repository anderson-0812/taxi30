import { Account } from "./account.entity";
import { RefreshToken } from "./refresh_token.entity";
/*
import { Blurd } from "./blurd.entity";
import { Member } from "./member.entity";
import { PersonService } from "./person_service.entity";
import { RelocatedSquare } from "./relocated_square.entity";
import { SquareFraction } from "./square_fraction.entity";
import { Travel } from "./travel.entity";
import { Vehicle } from "./vehicle.entity";
import { Group } from "./group.entity";
import { Passenger } from "./passenger.entity";
import { NotificationPerson } from "./notification_person.entity";
import { PanicButtom } from "./panic_buttom.entity";
import { Routes } from "./routes.entity";
import { SummaryTravel } from "./summary_travel.entity";
import { PersonPlace } from "./person_place.entity";
*/
// identification -> cédula
export class Person {
    idPerson: number;
    identification: string;
    name: string;
    lastname: string;
    birthday: Date;
    countryCode: string;
    cellphone: string;
    email: string;
    image: string;
    gender: string;
    role: number;
    active: boolean;
    isBicibus: boolean;
    isCarpool: boolean;
    longitude: number;
    latitude: number;
    principal_street: string;
    secondary_street: string;
    idAplication: number;
    idPlatform: number;
    isDisabled: boolean;
    hasAddress: boolean;
    account: Account;
    refreshTokens: RefreshToken[];
    /*
    groups?: Group[];
    Members?: Member[];
    travels?: Travel[];
    travelsRegisters?: Travel[];
    vehicles?: Vehicle[];
    relocatedSquares?: RelocatedSquare[];
    squareFractions?: SquareFraction[];
    personServices?: PersonService[];
    blurds?: Blurd[];
    passengers?: Passenger[];
    notificationPersons?: NotificationPerson[];
    panic?: PanicButtom[];
    routePerson?: Routes[];
    summaryTravels?: SummaryTravel[];
    personPlaces?: PersonPlace[];
    */
}