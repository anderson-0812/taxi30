import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

import { ErrorClientResponseDto, SuccessResponseDto } from "../generic_response.dto";
import { PersonDto } from "./person_response.dto";

class PersonResponseDto {
    @ApiProperty({ example: 1 })
    idPerson: number;

    @ApiProperty({ example: '0160001240001' })
    identification: string;

    @ApiProperty({ example: 'Mover U', description: "Campo que abarca los nombres y los apellidos" })
    fullname: string;

    @ApiProperty({ example: 'Mover U' })
    name: string;

    @ApiProperty({ example: 'Mover U' })
    lastname: string;

    @ApiProperty({ example: 'moveru@ucuenca.edu.ec' })
    email: string;

    @ApiPropertyOptional({ example: '' })
    image: string;

    @ApiProperty({ example: 1 })
    idAccount: number;

    @ApiProperty({ example: 'moveru@ucuenca.edu.ec' })
    username: string;

    @ApiProperty({ example: true })
    active: boolean;

    @ApiProperty({ example: true })
    refresh: boolean;

    @ApiProperty({ example: "+593" })
    countryCode: string;

    @ApiProperty({ example: 1 })
    role: number;

    @ApiProperty({ example: "0991539286" })
    cellphone: string;

    @ApiProperty({ example: false })
    isDisabled: boolean;

    @ApiProperty({ example: false })
    google: boolean;
}

class RefreshTokenResponseDto {
    @ApiProperty({ example: 1 })
    idRefreshToken: number;
}

export class SuccessSignUpResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Usuario registrado correctamente" })
    message: string;

    @ApiProperty({ type: PersonDto })
    data: PersonDto;
}

export class ErrorSignUpResponseDto extends ErrorClientResponseDto {
    @ApiProperty({ example: "Ocurrió un error al registrar usuario" })
    message: string;

    @ApiProperty({ example: "" })
    data: string;
}

export class SuccessSignInResponseDto {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZFBlcnNvbiI6NCwiaWRlbnRpZmljYXRpb24iOiIwMTYwMDAxMjQwMDAxIiwiZnVsbG5hbWUiOiJNb3ZlciBVIE1vdmVyIFUiLCJuYW1lIjoiTW92ZXIgVSIsImxhc3RuYW1lIjoiTW92ZXIgVSIsImVtYWlsIjoibW92ZXJ1QHVjdWVuY2EuZWR1LmVjIiwiaWRBY2NvdW50Ijo1LCJ1c2VybmFtZSI6Im1vdmVydSIsImFjdGl2ZSI6dHJ1ZSwiaW1hZ2UiOiIiLCJyZWZyZXNoIjp0cnVlLCJjb3VudHJ5Q29kZSI6Iis1OTMiLCJyb2xlIjoxLCJjZWxscGhvbmUiOiIwOTkxNTM5Mjg2IiwiaXNEaXNhYmxlZCI6ZmFsc2UsImdvb2dsZSI6ZmFsc2UsImlhdCI6MTY3NDU5MzQ4MiwiZXhwIjoxNjc0NzY2MjgyfQ.f3VB561hSbHqcRMB7Hg3JqgKXriBNPZcH7H0RKD6Qy8"
    })
    token: string;

    @ApiProperty({ type: PersonResponseDto })
    person: PersonResponseDto;

    @ApiProperty({ type: RefreshTokenResponseDto })
    refreshToken: RefreshTokenResponseDto;
}

export class ErrorSignInResponseDto extends ErrorClientResponseDto {
    @ApiProperty({ example: "Ocurrió un error al iniciar sesión" })
    message: string;

    @ApiProperty({ example: "" })
    data: string;
}

export class SuccessValidateTokenDto extends SuccessResponseDto {
    @ApiProperty({ example: "La validación del token fue exitosa" })
    message: string;

    @ApiProperty({ example: true })
    data: boolean;
}

export class SuccessRefreshTokenResponseDto extends SuccessSignInResponseDto {
    @ApiProperty({ example: false, description: "Atributo que indica si es necesario volver a iniciar sesión o se puede mantener la sesión del usuario" })
    change: boolean;
}

export class SuccessLogoutResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Cerrado de Sesión realizado correctamente" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}