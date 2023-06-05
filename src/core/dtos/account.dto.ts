import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { isRequiredMessage, isStringMessage } from "../constants";
import { Profile } from "../entities";
import { ProfileDto } from "./responses";
export class AccountDto {
    @ApiProperty({ examples: ['moveru'] })
    @IsString({ message: isStringMessage('Nombre de Usuario') })
    @IsNotEmpty({ message: isRequiredMessage('Nombre de Usuario') })
    username: string;

    @ApiProperty({ example: 'moveru' })
    @IsString({ message: isStringMessage('Contraseña') })
    @IsNotEmpty({ message: isRequiredMessage('Contraseña') })
    password: string;

    @ApiPropertyOptional({ example: true })
    rememberMe?: boolean;

    @ApiPropertyOptional({ example: false })
    google?: boolean;
}

export class CreateAccountDto {
    @ApiProperty({ example: 'moveru' })
    @IsString({ message: isStringMessage('Nombre de Usuario') })
    @IsNotEmpty({ message: isRequiredMessage('Nombre de Usuario') })
    username: string;

    @ApiProperty({ example: 'moveru' })
    @IsString({ message: isStringMessage('Contraseña') })
    @IsNotEmpty({ message: isRequiredMessage('Contraseña') })
    password: string;

    @ApiPropertyOptional({ example: false })
    google?: boolean;
}

export class UpdatePasswordDto {
    @ApiProperty({ example: "moveru" })
    @IsString({ message: isStringMessage('contraseña actual') })
    @IsNotEmpty({ message: isRequiredMessage('contraseña actual') })
    oldPassword: string;

    @ApiProperty({ example: "moveru" })
    @IsString({ message: isStringMessage('nueva contraseña') })
    @IsNotEmpty({ message: isRequiredMessage('nueva contraseña') })
    newPassword: string;
}

export class SetProfilesDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: isRequiredMessage('Id Cuenta') })
    idAccount: number;

    @ApiProperty({ isArray: true, type: ProfileDto })
    @IsNotEmpty({ message: isRequiredMessage('Perfiles') })
    profiles: Profile[];
}