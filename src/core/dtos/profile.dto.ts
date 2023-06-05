import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

import { isRequiredMessage, isStringMessage } from "../constants";
// import { Module } from "../entities";
import { ModuleDto } from "./responses/module_response.dto";

export class CreateProfileDto {
    @ApiProperty({ example: "Administrador" })
    @IsString({ message: isStringMessage('nombre') })
    @IsNotEmpty({ message: isRequiredMessage('nombre') })
    name: string;

    @ApiProperty({ example: "Acceso total al sistema" })
    @IsString({ message: isStringMessage('descripción') })
    description: string;

    // @ApiProperty({ isArray: true, type: ModuleDto })
    // modules: Module[];
}

export class UpdateProfileDto extends CreateProfileDto { }