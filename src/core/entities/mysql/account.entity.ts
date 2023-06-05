import { Person } from "./person.entity";
import { Profile } from "./profile.entity";
export class Account {
    idAccount?: number;
    username: string;
    password: string;
    passwordTemp: string;
    rememberMe: boolean;
    active: boolean;
    person?: Person;
    profiles: Profile[];
    google: boolean;
}