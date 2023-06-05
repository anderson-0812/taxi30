import { ApiProperty } from "@nestjs/swagger";
import { ErrorClientResponseDto, SuccessResponseDto } from "../generic_response.dto";
import { ProfileDto, ProfileInformationDto } from "./profile_response.dto";

export class AccountDto {
    @ApiProperty({ example: 1 })
    idAccount: number;

    @ApiProperty({ example: 'moveru' })
    username: string;

    @ApiProperty({ example: 'moveru' })
    password: string;

    @ApiProperty({ example: '' })
    passwordTemp: string;

    @ApiProperty({ example: false })
    rememberMe: boolean;

    @ApiProperty({ example: true })
    active: boolean;

    @ApiProperty({ example: false })
    google: boolean;
}

export class AccountInformationDto {
    @ApiProperty({ example: 1 })
    idAccount: number;

    @ApiProperty({ example: 'moveru' })
    username: string;

    @ApiProperty({ example: false })
    google: boolean;

    @ApiProperty({ isArray: true, type: ProfileInformationDto })
    profiles: ProfileInformationDto[];
}

class AccountProfilesDto {
    @ApiProperty({ example: 1 })
    idAccount: number;

    @ApiProperty({ example: true })
    active: boolean;

    @ApiProperty({ isArray: true, type: ProfileDto })
    profiles: ProfileDto[];
}

export class SucccessGetAccountDto extends SuccessResponseDto {
    @ApiProperty({ example: "Cuenta obtenida correctamente" })
    message: string;

    @ApiProperty({ type: AccountProfilesDto })
    data: AccountProfilesDto;
}

export class SucccessSetProfilesDto extends SuccessResponseDto {
    @ApiProperty({ example: "Perfiles asignados a la cuenta de manera correcta" })
    message: string;

    @ApiProperty({ type: AccountProfilesDto })
    data: AccountProfilesDto;
}

export class SuccessUpdatePasswordDto extends SuccessResponseDto {
    @ApiProperty({ example: "La contraseña se actualizó correctamente" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}

export class ErrorUpdatePasswordDto extends ErrorClientResponseDto {
    @ApiProperty({ example: "La contraseña actual es incorrecta o no se enviaron los campos requeridos" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}