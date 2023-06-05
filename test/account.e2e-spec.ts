import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { DataServicesModule } from '../src/services/database-services.module';
import { AuthServicesModule } from '../src/services/auth-services.module';
import { AuthController } from '../src/controllers/auth.controller';
import { AuthUseCasesModule } from '../src/use-cases/auth';
import { AccountController } from '../src/controllers/account.controller';
import { AccountUseCasesModule } from '../src/use-cases/accounts';

let app: INestApplication;
let token: string;
let person: any;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [DataServicesModule, AccountUseCasesModule, AuthUseCasesModule, AuthServicesModule],
        controllers: [AuthController, AccountController]
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

    token = response.body.data.token;
    person = response.body.data.person;    
});


describe('Obtener Cuenta', () => {
    it('Obtener Cuenta - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .get(`/api/account/${person.idAccount}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

describe('Asignar perfiles a la cuenta', () => {
    it('Asignar perfiles a la cuenta - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .post(`/api/account/set-profiles`)
            .send({
                "idAccount": person.idAccount,
                "profiles": [
                    { name: "Administrador", description: "Descripción de Administrador" },
                ]
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(201);
    });
});


describe('Actualizar contraseña', () => {
    it('Actualizar contraseña - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .put(`/api/account/update-password/${person.idAccount}`)
            .send({
                "oldPassword": "test",
                "newPassword": "test"
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });

    it('Actualizar contraseña - contraseña actual incorrecta', () => {
        return request(app.getHttpServer())
            .put(`/api/account/update-password/${person.idAccount}`)
            .send({
                "oldPassword": "test123",
                "newPassword": "test"
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(400);
    });
});

afterAll(async () => {
    await app.close();
});
