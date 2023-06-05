import { IsDate, IsEmail, IsNotEmpty, IsString, MaxDate, Validate } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from "class-transformer";

import { IdentificationValidator } from "../validators/identification-validator";
import { isDateMessage, isEmailMessage, isRequiredMessage, isStringMessage } from "../constants";
import { CreateAccountDto } from "./account.dto";

export class SignUpDto {
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

    @ApiProperty({ type: CreateAccountDto })
    account: CreateAccountDto;

    @ApiProperty({ example: 'Masculino' })
    gender: string;

    @ApiPropertyOptional({ example: true })
    hasAddress?: boolean;

    @ApiPropertyOptional({ example: '' })
    image?: string;

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
}

export class SignInMobileDto {
    @ApiProperty({
        example: 'moveru@ucuenca.edu.ec',
        description: `El campo de usuario para el inicio de sesión desde móvil se puede realizar a través del correo electrónico del usuario o mediante su número de cédula`
    })
    @IsString({ message: isStringMessage('Nombre de Usuario') })
    @IsNotEmpty({ message: isRequiredMessage('Nombre de Usuario') })
    username: string;

    @ApiProperty({ example: 'moveru' })
    @IsString({ message: isStringMessage('Contraseña') })
    @IsNotEmpty({ message: isRequiredMessage('Contraseña') })
    password: string;
}

export class SignInWebDto extends SignInMobileDto {
    @ApiProperty({
        example: 'moveru',
        description: `El campo de usuario para el inicio de sesión desde web se puede realizar a través del nombre de usuario o mediante su número de cédula`
    })
    @IsString({ message: isStringMessage('Nombre de Usuario') })
    @IsNotEmpty({ message: isRequiredMessage('Nombre de Usuario') })
    username: string;
}

export class SignInGoogleDto {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFBlcnNvbiI6NCwiaWRlbnRpZmljYXRpb24iOiIwMTYwMDAxMjQwMDAxIiwiZnVsbG5hbWUiOiJNb3ZlciBVIE1vdmVyIFUiLCJuYW1lIjoiTW92ZXIgVSIsImxhc3RuYW1lIjoiTW92ZXIgVSIsImVtYWlsIjoibW92ZXJ1QHVjdWVuY2EuZWR1LmVjIiwiaWRBY2NvdW50Ijo1LCJ1c2VybmFtZSI6Im1vdmVydSIsImFjdGl2ZSI6dHJ1ZSwiaW1hZ2UiOiIiLCJyZWZyZXNoIjp0cnVlLCJjb3VudHJ5Q29kZSI6Iis1OTMiLCJyb2xlIjoxLCJjZWxscGhvbmUiOiIwOTkxNTM5Mjg2IiwiaXNEaXNhYmxlZCI6ZmFsc2UsImdvb2dsZSI6ZmFsc2UsImlhdCI6MTY3NDU5MzQ4MiwiZXhwIjoxNjc0NzY2MjgyfQ.f3VB561hSbHqcRMB7Hg3JqgKXriBNPZcH7H0RKD6Qy8"
    })
    @IsNotEmpty({ message: isRequiredMessage('token') })
    token: string;

    @ApiProperty({ example: true })
    @IsNotEmpty({ message: isRequiredMessage('google') })
    google: boolean;

    @ApiProperty({ example: true })
    @IsNotEmpty({ message: isRequiredMessage('llamada desde web') })
    callFromWeb: boolean;
}

export class LogoutDto {
    @ApiProperty({ example: 1 })
    @IsNotEmpty({ message: isRequiredMessage('Id Refrescar Token') })
    idRefreshToken: number;
}