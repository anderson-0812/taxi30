import { ApiProperty } from "@nestjs/swagger";
import { SuccessResponseDto } from "../generic_response.dto";

export class SearchAddressDto {
    @ApiProperty({ example: 199356367 })
    place_id: number;

    @ApiProperty({ example: 'El Dorado, Totoracocha, Cuenca, Azuay, 010210, Ecuador' })
    display_name: string;

    @ApiProperty({ example: -2.8977906 })
    latitude: number;

    @ApiProperty({ example: -78.9842438 })
    longitude: number;

    @ApiProperty({ example: 'El Dorado,El Dorado,Totoracocha' })
    address: string;

    @ApiProperty({ example: 'El Dorado' })
    road: string;

    @ApiProperty({ example: 'El Dorado' })
    neighbourhood: string;

    @ApiProperty({ example: 'Totoracocha' })
    suburb: string;
}

export class GetSearchAddressSuccessDto extends SuccessResponseDto {
    @ApiProperty({ example: "Búsqueda exitosa" })
    message: string;

    @ApiProperty({ isArray: true, type: SearchAddressDto })
    data: SearchAddressDto[];
}

export class GetSearchAddressByCoordinatesSuccessDto extends SuccessResponseDto {
    @ApiProperty({ example: "Búsqueda exitosa" })
    message: string;

    @ApiProperty({ type: SearchAddressDto })
    data: SearchAddressDto;
}