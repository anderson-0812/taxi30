import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "../generic_response.dto";

export class PersonServiceDto {
    @ApiProperty({ example: 1 })
    idPersonService: number;

    @ApiProperty({ example: 1 })
    idPerson: number;

    @ApiProperty({ example: 1 })
    idService: number;

    @ApiProperty({ example: '2022-12-07 21:50:18' })
    createdAt: Date;
}

export class CreatePersonServiceSuccessDto extends SuccessResponseDto {
    @ApiProperty({ example: "El registro de Persona-Servicio fue creado correctamente" })
    message: string;

    @ApiProperty({ type: PersonServiceDto })
    data: PersonServiceDto;
}

export class AllPersonServiceSuccessDto extends SuccessResponseDto {
    @ApiProperty({ example: "Listado de Persona-Servicio obtenido correctamente" })
    message: string;

    @ApiProperty({ isArray: true, type:  PersonServiceDto })
    data: PersonServiceDto[];
}
