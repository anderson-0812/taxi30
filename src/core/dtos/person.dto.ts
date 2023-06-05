import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsString, MaxDate, Validate } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { isDateMessage, isEmailMessage, isRequiredMessage, isStringMessage } from "../constants";
import { IdentificationValidator } from "../validators/identification-validator";
import { CreateAccountDto } from "./account.dto";

export class UpdatePersonDto {
    @ApiProperty({ example: '0160001240001' })
    @Validate(IdentificationValidator)
    identification: string;

    @ApiProperty({ example: 'Mover U' })
    @IsString({ message: isStringMessage('Nombre') })
    @IsNotEmpty({ message: isRequiredMessage('Nombre') })
    name: string;

    @ApiProperty({ example: "Mover U" })
    @IsString({ message: isStringMessage('Apellido') })
    @IsNotEmpty({ message: isRequiredMessage('Apellido') })
    lastname: string;

    @ApiProperty({ example: '10/15/1967' })
    @Transform(({ value }) => new Date(value))
    @IsDate({ message: isDateMessage('Fecha de Nacimiento') })
    @MaxDate(new Date(), { message: isDateMessage('Fecha de Nacimiento') })
    birthday: Date;

    @ApiProperty({ example: '+593' })
    countryCode: string;

    @ApiProperty({ example: '0991539286' })
    cellphone: string;

    @ApiProperty({ example: 'moveru@ucuenca.edu.ec' })
    // @IsEmail({ message: isEmailMessage })
    @IsNotEmpty({ message: isRequiredMessage('Correo Electrónico') })
    email: string;

    @ApiProperty({ example: 1, enum: ['1. Estudiante', '2. Docente', '3. Administrativo', '4. Chofer'] })
    @IsNotEmpty({ message: isRequiredMessage('Rol Persona') })
    role: number;

    @ApiProperty({ example: false })
    isDisabled: boolean;

    @ApiPropertyOptional({ example: false })
    hasAddress?: boolean;

    @ApiPropertyOptional({ example: false })
    isBicibus?: boolean;

    @ApiPropertyOptional({ example: false })
    isCarpool?: boolean;

    @ApiPropertyOptional({ example: -79.01032688505342 })
    longitude?: number;

    @ApiPropertyOptional({ example: -2.8992552928153543 })
    latitude?: number;

    @ApiPropertyOptional({ example: "Avenida 12 de Abril" })
    principal_street?: string;

    @ApiPropertyOptional({ example: "Avenida Loja" })
    secondary_street?: string;

    @ApiProperty({ type: CreateAccountDto })
    account: CreateAccountDto;

    @ApiProperty({ example: 'Masculino' })
    gender: string;

    @ApiPropertyOptional({ example: '' })
    image?: string;
}

export class UpdateImagePersonDto {
    @ApiProperty({ example: 'image.jpg' })
    @IsNotEmpty({ message: isRequiredMessage('imagen') })
    imagePath: string;
}

export class PersonVehicleOptionsDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: isRequiredMessage('id Persona') })
    idPerson: number;

    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: isRequiredMessage('id Vehículo') })
    idVehicle: number;
}

export class PersonBodyDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: isRequiredMessage('id Persona') })
    idPerson: number;

}
