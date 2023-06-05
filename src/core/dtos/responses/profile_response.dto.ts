import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "../generic_response.dto";
import { ModuleDto } from "./module_response.dto";

export class ProfileDto {
    @ApiProperty({ example: 1 })
    idProfile: number;

    @ApiProperty({ example: "Administrador" })
    name: string;

    @ApiProperty({ example: "Acceso total al sistema" })
    description: string;

    @ApiProperty({ example: true })
    active: boolean;
}

export class ProfileInformationDto {
    @ApiProperty({ example: 1 })
    idProfile: number;

    @ApiProperty({ example: "Administrador" })
    name: string;
}

class ProfileModulesDto extends ProfileDto {
    @ApiProperty({ isArray: true, type: ModuleDto })
    modules: ModuleDto[];
}

export class CreateProfileSuccessDto extends SuccessResponseDto {
    @ApiProperty({ example: "Perfil creado exitosamente" })
    message: string;

    @ApiProperty({ type: ProfileDto })
    data: ProfileDto;
}

export class AllProfilesSuccessDto extends SuccessResponseDto {
    @ApiProperty({ example: "Listado de Perfiles obtenido exitosamente" })
    message: string;

    @ApiProperty({ isArray: true, type: ProfileModulesDto })
    data: ProfileModulesDto;
}

export class UpdateProfileSuccessDto extends SuccessResponseDto {
    @ApiProperty({ example: "Perfil actualizado exitosamente" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}

export class UpdateStatusProfileSuccessDto extends SuccessResponseDto {
    @ApiProperty({ example: "El estado del perfil se ha actualizado exitosamente" })
    message: string;

    @ApiProperty({ example: null })
    data: string;
}