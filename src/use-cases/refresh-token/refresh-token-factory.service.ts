import { Injectable } from "@nestjs/common";

import { CreateRefreshTokenDto } from "../../core/dtos";
import { Person, RefreshToken } from "../../core/entities";

@Injectable()
export class RefreshTokenFactoryService {
    createRefreshToken(createRefreshToken: CreateRefreshTokenDto) {
        const expiredAt = new Date();
        expiredAt.setSeconds(expiredAt.getDate() + (parseInt(process.env.TOKEN_EXPIRATION_WEB) - 5));
        
        const refreshToken = new RefreshToken();
        refreshToken.token = createRefreshToken.token;

        const person = new Person();
        person.idPerson = createRefreshToken.idPerson;

        refreshToken.person = person;
        refreshToken.expiryDate = expiredAt.getTime().toString();
        refreshToken.platform = createRefreshToken.platform;

        return refreshToken;
    }
}