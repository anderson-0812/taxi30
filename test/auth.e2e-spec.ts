import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as CryptoJS from 'crypto-js';

import { DataServicesModule } from '../src/services/database-services.module';
import { AuthUseCasesModule } from '../src/use-cases/auth';
import { AuthServicesModule } from '../src/services/auth-services.module';
import { AuthController } from '../src/controllers/auth.controller';
import { INTERNAL_CODE_OK } from '../src/helpers/codeResponse';

let app: INestApplication;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [DataServicesModule, AuthUseCasesModule, AuthServicesModule],
        controllers: [AuthController]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    useContainer(app.select(AuthServicesModule), { fallbackOnErrors: true });
});

let idRefreshToken: number;
let tokenMobile: string;
let tokenWeb: string;
let idPerson: number;

describe('Registrar Usuario', () => {
    const person = {
        "identification": "1104015928",
        "name": "Test",
        "lastname": "Test",
        "birthday": "07-21-1998",
        "countryCode": "+593",
        "cellphone": "939234427",
        "email": "test@test.com",
        "hasAddress": false,
        "image": "",
        "role": 1,
        "isDisabled": false,
        "gender": "Masculino",
        "account": {
            "username": "test",
            "password": "test",
            "type": "Administrador"
        }
    }

    it('Registrar Usuario. Flujo Ideal', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/auth/signup')
            .send(person);
        expect(response.body.internalCode).toBe(INTERNAL_CODE_OK);
    });

    it('Registrar Usuario. Flujo Alterno - Cédula Incorrecta', () => {
        return request(app.getHttpServer())
            .post('/api/auth/signup')
            .send({
                ...person,
                "identification": "1100000021"
            }).expect(400);
    });

    it('Registrar Usuario. Flujo Alterno - Datos Incompletos', () => {
        return request(app.getHttpServer())
            .post('/api/auth/signup')
            .send({
                "identification": "1104015928",
                "name": "test",
                "lastname": "test",
                "birthday": "07-21-1998",
                "cellphone": "0999999999",
                "email": "test@gmail.com",
            }).expect(400);
    });
});

describe('Iniciar/Cerrar Sesión y Refrecar el token de autenticación. Web y Móvil', () => {

    it('Iniciar Sesión en móvil. Flujo Ideal', async () => {
        const response = await request(app.getHttpServer())
            .post('/api/auth/signin')
            .send({
                "username": "test@test.com",
                "password": "test"
            });
        expect(200);
        
        idRefreshToken = response.body.data.refreshToken.idRefreshToken;
        tokenMobile = response.body.data.token;
        idPerson = response.body.data.person.idPerson;
    });

    it('Refrescar Token en móvil - Flujo Ideal', () => {  
        return request(app.getHttpServer())
            .post('/api/auth/refresh-token')
            .send({
                token: tokenMobile,
                idPerson: idPerson
            })
            .expect(201);
    });

    it('Iniciar Sesión Web. Flujo Ideal', () => {
        return request(app.getHttpServer())
            .post('/api/auth/signin-web')
            .send({
                "username": "test",
                "password": CryptoJS.AES.encrypt("test", "moverU").toString(),
            })
            .expect(201)
            .then(user => {
                idRefreshToken = user.body.data.refreshToken.idRefreshToken;
                tokenWeb = user.body.data.token;
                idPerson = user.body.data.idPerson;
            });
    });

    it('Validar token para web. Flujo ideal', () => {
        return request(app.getHttpServer())
        .post('/api/auth/validate-token')
        .send({
            token: tokenWeb
        })
        .expect(201);
    });

    it('Refrescar Token en web - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .post('/api/auth/refresh-token-web')
            .send({
                token: tokenWeb,
                refresh: false
            })
            .expect(201);
    });

    it('Iniciar Sesión Web. Flujo Alterno - Datos Incorrectos', () => {
        return request(app.getHttpServer())
            .post('/api/auth/signin-web')
            .send({
                "username": "example",
                "password": "Example123",
            }).expect(400);
    });

    it('Iniciar Sesión Web. Flujo Alterno - Datos Incompletos', () => {
        return request(app.getHttpServer())
            .post('/api/auth/signin-web')
            .send({
                "username": "example"
            }).expect(400);
    });

    it('Cerrar Sesión - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .post('/api/auth/logout')
            .send({ "idRefreshToken": idRefreshToken })
            .expect(201);
    });
});

afterAll(async () => {
    await app.close();
});