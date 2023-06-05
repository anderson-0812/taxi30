import { Account } from "./account.entity";
// import { Module } from "./module.entity";

export class Profile {
    idProfile: number;
    name: string;
    description: string;
    active: boolean;
    accounts: Account[];
}