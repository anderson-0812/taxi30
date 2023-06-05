import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import { AccountDto, UpdatePersonDto, SignUpDto } from "../../core/dtos";
import { Account, Person } from "../../core/entities";

@Injectable()
export class AuthFactoryService {
    // Registro de Usuario
    async signUp(signUpDto: SignUpDto) {
        const person = new Person();

        //Persona
        person.identification = signUpDto.identification;
        person.name = signUpDto.name;
        person.lastname = signUpDto.lastname;
        person.birthday = new Date(signUpDto.birthday);
        person.countryCode = signUpDto.countryCode;
        person.cellphone = signUpDto.cellphone;
        person.email = signUpDto.email;
        person.gender = signUpDto.gender;
        person.image = (signUpDto.image) ? signUpDto.image : '';
        person.role = signUpDto.role;
        person.isDisabled = signUpDto.isDisabled;
        person.hasAddress = (signUpDto.hasAddress) ? signUpDto.hasAddress : false;
        person.isBicibus = signUpDto.isBicibus;
        person.isCarpool = signUpDto.isCarpool;
        person.latitude = signUpDto.latitude;
        person.longitude = signUpDto.longitude;
        person.principal_street = signUpDto.principal_street;
        person.secondary_street = signUpDto.secondary_street;

        //Cuenta
        const account = new Account();
        account.username = signUpDto.account.username;
        account.password = await bcrypt.hash(signUpDto.account.password, 10);
        account.google = signUpDto.account.google;

        person.account = account;
        return person;
    }

    //Iniciar Sesión del Usuario
    signIn(accountDto: AccountDto) {
        const account = new Account();
        account.username = accountDto.username;
        account.password = accountDto.password;
        account.rememberMe = accountDto.rememberMe;
        return account;
    }


    // update data's person form google
    updatePerson(updatePersonDto: UpdatePersonDto) {
        const person = new Person();

        //Persona
        person.identification = updatePersonDto.identification;
        person.name = updatePersonDto.name;
        person.lastname = updatePersonDto.lastname;
        person.birthday = new Date(updatePersonDto.birthday);
        person.countryCode = updatePersonDto.countryCode;
        person.cellphone = updatePersonDto.cellphone;
        person.email = updatePersonDto.email;
        person.gender = updatePersonDto.gender;
        person.image = (updatePersonDto.image) ? updatePersonDto.image : '';
        person.role = updatePersonDto.role;
        person.isDisabled = updatePersonDto.isDisabled;
        person.isBicibus = updatePersonDto.isBicibus;
        person.isCarpool = updatePersonDto.isCarpool;
        person.latitude = updatePersonDto.latitude;
        person.longitude = updatePersonDto.longitude;
        person.principal_street = updatePersonDto.principal_street;
        person.secondary_street = updatePersonDto.secondary_street;

        //Cuenta 
        const account = new Account();
        account.username = updatePersonDto.account.username;
        account.active = true;
        account.google = updatePersonDto.account.google;

        return { person, account };
    }
}