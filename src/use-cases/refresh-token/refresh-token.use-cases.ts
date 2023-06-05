import { Injectable } from "@nestjs/common";

import { errorNotRegisterFound, successResponse } from "../../helpers/responses";
import { IDataServices } from "../../core/abstracts";
import { CreateRefreshTokenDto } from "../../core/dtos";
import { RefreshToken } from "../../core/entities";
import { RefreshTokenFactoryService } from "./refresh-token-factory.service";

@Injectable()
export class RefreshTokenUseCases {
    constructor(
        private dataServices: IDataServices,
        private refreshTokenFactoryService: RefreshTokenFactoryService
    ) { }

    createRefreshToken(createRefreshTokenDto: CreateRefreshTokenDto) {
        const refreshToken = this.refreshTokenFactoryService.createRefreshToken(createRefreshTokenDto);
        return this.dataServices.refreshToken.create(refreshToken);
    }

    getOneRefreshToken(token: string) {
        return this.dataServices.refreshToken.getOne({ token: token }, 'person');
    }

    async getRefreshToken(idRefreshToken: number) {
        const refreshToken = await this.dataServices.refreshToken.getOne({ idRefreshToken: idRefreshToken });
        if (!refreshToken) {
            return errorNotRegisterFound('No se encontró el token');
        }
        return successResponse('Refresh Token obtenido correctamente', refreshToken);
    }

    deleteRefreshToken(idRefreshToken: number) {
        return this.dataServices.refreshToken.delete(idRefreshToken);
    }

    verifyExpiration(refreshToken: RefreshToken) {
        return parseInt(refreshToken.expiryDate) < new Date().getTime();
    }
}