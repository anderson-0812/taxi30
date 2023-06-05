import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { DataServicesModule } from '../src/services/database-services.module';
import { AuthServicesModule } from '../src/services/auth-services.module';
import { AuthController } from '../src/controllers/auth.controller';
import { AuthUseCasesModule } from '../src/use-cases/auth';
import { ProfileController } from '../src/controllers/profile.controller';
import { ProfileUseCasesModule } from '../src/use-cases/profiles';
import { Profile } from '../src/core/entities';

let app: INestApplication;
let token: string;
let profile: Profile;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [DataServicesModule, ProfileUseCasesModule, AuthUseCasesModule, AuthServicesModule],
        controllers: [AuthController, ProfileController]
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
});


describe('Crear Perfil', () => {
    it('Crear Perfil - Flujo Ideal', () => {
        return request(app.getHttpServer())
        .post(`/api/profile/create`)
        .send({
            "name": "Perfil de Prueba",
            "description": "Descripción de Perfil"
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(201);
    });
});

describe('Obtener todos los Perfiles y actualizaciones', () => {
    it('Obtener todos los Perfiles - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .get(`/api/profile/all`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .then((res) => {
                profile = res.body.data[0];
            });
    });

    it('Actualizar Perfil - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .put(`/api/profile/update/${profile.idProfile}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "Perfil Modificado",
                "description": "Descripción de Perfil Modificado"
            })
            .expect(200);
    });

    it('Actualizar Estado de Perfil - Flujo Ideal', () => {
        return request(app.getHttpServer())
            .put(`/api/profile/update-active/${profile.idProfile}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "active": false,
            })
            .expect(200);
    });
});

afterAll(async () => {
    await app.close();
});
