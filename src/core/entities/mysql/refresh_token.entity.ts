import { Person } from "./person.entity";

export class RefreshToken {
    idRefreshToken: number;
    token: string;
    expiryDate: string;
    platform: number;
    person: Person;
}