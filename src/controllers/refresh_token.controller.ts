import { Controller, Get, Param } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

import { SuccessGetRefreshTokenResponseDto } from "../core/dtos/responses";
import { RefreshTokenUseCases } from "../use-cases/refresh-token";

@ApiTags('Refrescar Token de Usuario')
@Controller('/api/refresh-token')
export class RefreshTokenController {
    constructor(private refreshTokenUseCases: RefreshTokenUseCases) { }

    @Get('/:id')
    @ApiResponse({
        status: 200,
        description: `Obtener registro de la tabla "Refresh Token".`,
        type: SuccessGetRefreshTokenResponseDto
    })
    getRefreshToken(@Param('id') idRefreshToken: number) {
        return this.refreshTokenUseCases.getRefreshToken(idRefreshToken);
    }
}