import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "../generic_response.dto";

export class ModuleDto {
    @ApiProperty({ example: 1 })
    idModule: number;

    @ApiProperty({ example: "Usuarios" })
    name: string;

    @ApiProperty({ example: "Administración de usuarios y accesos del sistema" })
    description: string;

    @ApiProperty({ example: "/users" })
    route: string;

    @ApiProperty({ example: 1 })
    order: number;

    @ApiProperty({ example: true })
    active: boolean;
}

export class GetModulesDto extends SuccessResponseDto {
    @ApiProperty({ example: "Módulos de la persona obtenidos correctamente" })
    message: string;

    @ApiProperty({ isArray: true, type: ModuleDto })
    data: ModuleDto[];
}