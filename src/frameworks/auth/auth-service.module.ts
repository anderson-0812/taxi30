import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';

import { RefreshTokenUseCasesModule } from '../../use-cases/refresh-token';
import { IAuthServices } from '../../core/abstracts';
import { MysqlDataServicesModule } from '../database/mysql/mysql-data-services.module';
import { AuthServices } from './auth-services.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './stategies/jwt.stategy';

@Module({
    imports: [
        RefreshTokenUseCasesModule,
        MysqlDataServicesModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expirationWeb }
        })
    ],
    providers: [
        {
            provide: IAuthServices,
            useClass: AuthServices
        },
        JwtStrategy
    ],
    exports: [IAuthServices]
})
export class AuthModule { }