import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { ERROR_CODE_BAD_REQUEST, ERROR_CODE_OK, INTERNAL_CODE_BAD_REQUEST, INTERNAL_CODE_OK } from '../../helpers/codeResponse';
import { isRequiredMessage } from '../constants';

export abstract class GenericResponseDTO {
    @ApiProperty()
    status: number;

    @ApiProperty()
    error: string;

    @ApiProperty()
    errorCode: number;

    @ApiProperty()
    message: string;
}

export class SuccessResponseDto {
    @ApiProperty({ example: INTERNAL_CODE_OK })
    status: number;

    @ApiProperty({ example: '' })
    error: string;

    @ApiProperty({ example: ERROR_CODE_OK })
    errorCode: number;
}

export class ErrorClientResponseDto {
    @ApiProperty({ example: INTERNAL_CODE_BAD_REQUEST })
    status: number;

    @ApiProperty({ example: 'Petición errónea' })
    error: string;

    @ApiProperty({ example: ERROR_CODE_BAD_REQUEST })
    errorCode: number;
}

export class UpdateActiveDto {
    @ApiProperty({ example: true })
    @IsNotEmpty({ message: isRequiredMessage('estado') })
    active: boolean;
}

class FiltersOptionsDto {
    @ApiPropertyOptional({ example: true })
    active: boolean;

    @ApiPropertyOptional({ example: true })
    inactive: boolean;
}

export class SearchOptionsDto {
    @ApiProperty({ example: '10' })
    @IsNotEmpty({ message: isRequiredMessage('límite') })
    limit: string;

    @ApiProperty({ example: '1' })
    @IsNotEmpty({ message: isRequiredMessage('página') })
    page: string;

    @ApiPropertyOptional({ example: 'Ordenar' })
    sortBy?: string;

    @ApiPropertyOptional({ example: true })
    descending?: boolean;

    @ApiPropertyOptional({ example: '' })
    search?: string;

    @ApiProperty({ type: FiltersOptionsDto })
    filters: FiltersOptionsDto;
}

class MetaDto {
    @ApiProperty({ example: 1 })
    currentPage: number;

    @ApiProperty({ example: 1 })
    itemCount: number;

    @ApiProperty({ example: 10 })
    itemsPerPage: number;

    @ApiProperty({ example: 1 })
    totalItems: number;

    @ApiProperty({ example: 1 })
    totalPages: number;
}
export class SearchResponseDto {
    @ApiProperty({ type: MetaDto })
    meta: MetaDto;
}

