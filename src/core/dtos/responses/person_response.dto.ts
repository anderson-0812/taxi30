import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { SearchResponseDto, SuccessResponseDto } from "../generic_response.dto";

import { AccountDto, AccountInformationDto } from "./account_response.dto";
import { RefreshTokenInformationDto } from "./refresh_token_response.dto";
// import { VehicleDto } from "./vehicle_response.dto";

export class PersonDto {
    @ApiProperty({ example: 1 })
    idPerson: number;

    @ApiProperty({ example: '0160001240001' })
    identification: string;

    @ApiProperty({ example: 'Mover U' })
    name: string;

    @ApiProperty({ example: "Mover U" })
    lastname: string;

    @ApiProperty({ example: '10/15/1967' })
    birthday: Date;

    @ApiProperty({ example: '+593' })
    countryCode: string;

    @ApiProperty({ example: '0991539286' })
    cellphone: string;

    @ApiProperty({ example: 'moveru@ucuenca.edu.ec' })
    email: string;

    @ApiProperty({ example: 1, enum: ['1. Estudiante', '2. Docente', '3. Administrativo', '4. Chofer'] })
    role: number;

    @ApiProperty({ example: false })
    isDisabled: boolean;

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

    @ApiProperty({ type: AccountDto })
    account: AccountDto;

    @ApiProperty({ example: 'Masculino' })
    gender: string;

    @ApiPropertyOptional({ example: '' })
    image?: string;
}

class PersonInformationDto {
    @ApiProperty({ example: 1 })
    idPerson: number;

    @ApiProperty({ example: '0160001240001' })
    identification: string;

    @ApiProperty({ example: 'Mover U' })
    name: string;

    @ApiProperty({ example: "Mover U" })
    lastname: string;

    @ApiProperty({ example: '10/15/1967' })
    birthday: Date;

    @ApiProperty({ example: '0991539286' })
    cellphone: string;

    @ApiProperty({ example: 'moveru@ucuenca.edu.ec' })
    email: string;

    @ApiProperty({ example: 1, enum: ['1. Estudiante', '2. Docente', '3. Administrativo', '4. Chofer'] })
    role: number;

    @ApiProperty({ example: false })
    isDisabled: boolean;

    @ApiProperty({ example: 'Masculino' })
    gender: string;

    @ApiPropertyOptional({ example: '' })
    image?: string;

    @ApiProperty({ example: true })
    active: boolean;

    @ApiProperty({ type: AccountInformationDto })
    account: AccountInformationDto;

    @ApiProperty({ isArray: true, type: RefreshTokenInformationDto })
    refreshTokens: RefreshTokenInformationDto[];
}

// class PersonVehicleDto extends PersonDto {
//     @ApiProperty({ isArray: true, type: VehicleDto })
//     vehicles: VehicleDto[];
// }

export class GetPeopleResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Listado de Personas obtenido satisfactoriamente" })
    message: string;

    @ApiProperty({ isArray: true, type: PersonInformationDto })
    data: PersonInformationDto[];
}

export class CountPersonResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "El número de personas se obtuvo correctamente" })
    message: string;

    @ApiProperty({ example: 1 })
    data: number;
}

export class GetPersonResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Listado de Personas obtenido satisfactoriamente" })
    message: string;

    @ApiProperty({ type: PersonDto })
    data: PersonInformationDto;
}

export class UpdatePersonResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Persona actualizada satisfactoriamente" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}

export class UpdateImagePersonResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "La imagen de usuario se actualizó correctamente" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}

export class UpdateActivePersonResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "El estado de la persona se actualizó correctamente" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}

class SearchPersonDto extends SearchResponseDto {
    @ApiProperty({ isArray: true, type: PersonDto })
    items: PersonDto[];
}

export class SearchPersonResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Búsqueda exitosa de usuarios" })
    message: string;

    @ApiProperty({ type: SearchPersonDto })
    data: SearchPersonDto;
}

export class ImportPersonResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Se han creado las personas y cuentas de manera correctamente" })
    message: string;

    @ApiProperty({ isArray: true, type: PersonDto })
    data: PersonDto[];
}

// export class VehiclePersonActiveResponseDto extends SuccessResponseDto {
//     @ApiProperty({ example: "Listado de vehículos activos obtenida correctamente" })
//     message: string;

//     @ApiProperty({ type: PersonVehicleDto })
//     data: PersonVehicleDto[];
// }

// export class VehiclePersonResponseDto extends SuccessResponseDto {
//     @ApiProperty({ example: "Listado de vehículos obtenida correctamente" })
//     message: string;

//     @ApiProperty({ type: PersonVehicleDto })
//     data: PersonVehicleDto[];
// }

export class SetActiveVehicleResponseDto extends SuccessResponseDto {
    @ApiProperty({ example: "Se actualizó el vehículo correctamente" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}