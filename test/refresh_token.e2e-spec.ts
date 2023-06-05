import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { DataServicesModule } from '../src/services/database-services.module';
import { AuthServicesModule } from '../src/services/auth-services.module';
import { AuthUseCasesModule } from '../src/use-cases/auth';
import { RefreshTokenUseCasesModule } from '../src/use-cases/refresh-token';
import { RefreshTokenController } from '../src/controllers/refresh_token.controller';
import { AuthController } from '../src/controllers/auth.controller';

let app: INestApplication;
let idRefreshToken: string;
beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [DataServicesModule, RefreshTokenUseCasesModule, AuthUseCasesModule, AuthServicesModule],
        controllers: [RefreshTokenController, AuthController]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    useContainer(app.select(AuthServicesModule), { fallbackOnErrors: true });

    let response = await request(app.getHttpServer())
        .post('/api/auth/signin')
        .send({
            "username": "1104015928",
            "password": "test",
        });
    idRefreshToken = response.body.data.refreshToken.idRefreshToken;
});


describe('Obtener registro de refresh token', () => {
    it('Obtener registro de refresh token - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .get(`/api/refresh-token/${idRefreshToken}`)
            .expect(200);
    });
});

afterAll(async () => {
    await app.close();
});
