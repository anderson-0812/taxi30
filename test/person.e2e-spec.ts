import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { DataServicesModule } from '../src/services/database-services.module';
import { AuthServicesModule } from '../src/services/auth-services.module';
import { PersonUseCasesModule } from '../src/use-cases/people';
import { PersonController } from '../src/controllers/person.controller';
import { AuthController } from '../src/controllers/auth.controller';
import { AuthUseCasesModule } from '../src/use-cases/auth';
import { Person } from '../src/core/entities';

let app: INestApplication;
let token: string;
let person: Person;
const testFile = (process.platform === 'win32') ? `${__dirname}\\files\\template-users.xlsx` : `${__dirname}/files/template-users.xlsx`;
const testTxt = (process.platform === 'win32') ? `${__dirname}\\files\\test.txt` : `${__dirname}/files/test.txt`;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [DataServicesModule, PersonUseCasesModule, AuthUseCasesModule, AuthServicesModule],
        controllers: [AuthController, PersonController]
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

describe('Obtener Listado de Usuarios', () => {
    it('Obtener Listado de Usuarios. Flujo Ideal', () => {
        return request(app.getHttpServer())
            .get(`/api/person/all`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});


describe('Obtener total de personas', () => {
    it('Obtener total de personas. Flujo ideal', () => {
        return request(app.getHttpServer())
            .get(`/api/person/count`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

describe('Obtener los últimos 14 registros de usuarios', () => {
    it('Obtener los últimos 14 registros de usuarios. Flujo ideal', () => {
        return request(app.getHttpServer())
            .get(`/api/person/last`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

describe('Obtener Persona', () => {
    it('Obtener Persona. Flujo Ideal', () => {
        return request(app.getHttpServer())
            .get(`/api/person/${person.idPerson}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

describe('Actualizar Usuario', () => {
    it('Actualizar información usuario. Flujo Ideal', () => {
        return request(app.getHttpServer())
            .put(`/api/person/update/${person.idPerson}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "identification": "1104015928",
                "name": "Test modificado",
                "lastname": "Test modificado",
                "birthday": "07-21-1998",
                "countryCode": "+593",
                "cellphone": "939234428",
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
            }).expect(200);
    });

    it('Actualizar nombre de imagen de usuario', () => {
        return request(app.getHttpServer())
            .put(`/api/person/update-image/${person.idPerson}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "imagePath": 'test.jpg',
            }).expect(200);
    });

    it('Actualizar estado de usuario. Flujo Ideal', () => {
        return request(app.getHttpServer())
            .put(`/api/person/update-active/${person.idPerson}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "active": true,
            }).expect(200);
    });
});

describe('Buscar y filtrar persona', () => {
    it('Buscar Persona. Flujo Ideal', () => {
        return request(app.getHttpServer())
            .post(`/api/person/search`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "search": "1104015928",
                "filters": {
                    "active": true,
                    "inactive": true
                },
                "page": 1,
                "limit": 10,
                "sortBy": "name",
                "descending": true
            })
            .expect(201);
    });
});

describe('Subir archivo de Persona para Carga Masiva', () => {
    it('Subir archivo de Persona para Carga Masiva. Flujo Ideal ', () => {
        return request(app.getHttpServer())
            .post(`/api/person/upload-file`)
            .set('Authorization', `Bearer ${token}`)
            .attach("file", testFile, { contentType: 'application/octet-stream' })
            .expect(201);
    });

    it('Subir archivo de Persona para Carga Masiva. Flujo Alterno - Archivo con extensión errónea ', () => {
        return request(app.getHttpServer())
            .post(`/api/person/upload-file`)
            .set('Authorization', `Bearer ${token}`)
            .attach("file", testTxt, { contentType: 'application/octet-stream' })
            .expect(400);
    });
});

describe('Obtener vehículos de la persona', () => {
    it('Obtener vehículos de la persona - Flujo ideal', () => {
        return request(app.getHttpServer())
            .get(`/api/person/get-vehicles/${person.idPerson}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

describe('Obtener el vehículo activo de la persona', () => {
    it('Obtener el vehículo activo de la persona - Flujo ideal', () => {
        return request(app.getHttpServer())
            .post(`/api/person/get-vehicle-active`)
            .send({
                'idPerson': 1,
                'idVehicle': 1
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(201);
    });
});

describe('Actualizar vehículos activos del usuario', () => {
    it('Actualizar vehículos activos del usuario - Flujo ideal', () => {
        return request(app.getHttpServer())
            .put(`/api/person/set-active-use-vehicle`)
            .send({
                "idPerson": person.idPerson,
                "idVehicle": 1
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

afterAll(async () => {
    await app.close();
});
