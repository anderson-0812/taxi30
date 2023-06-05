import { Injectable } from "@nestjs/common";

import { UpdatePersonDto } from "../../core/dtos";
import { Account, Person } from "../../core/entities";

@Injectable()
export class PersonFactoryService {
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
        person.role = updatePersonDto.role;
        person.isDisabled = updatePersonDto.isDisabled;
        person.hasAddress = updatePersonDto.hasAddress;
        person.longitude = updatePersonDto.longitude;
        person.latitude = updatePersonDto.latitude;
        person.principal_street = updatePersonDto.principal_street;
        person.secondary_street = updatePersonDto.secondary_street;
        person.isBicibus = updatePersonDto.isBicibus;
        person.isCarpool = updatePersonDto.isCarpool;
        person.image = updatePersonDto.image;
        //Cuenta 
        const account = new Account();
        account.username = updatePersonDto.account.username;
        account.active = true;
        
        return {person,account};
    }
}