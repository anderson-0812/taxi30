# Información del Proyecto 
El proyecto moveru_backend esta elaborado con la tecnología Nest JS, siguiendo la arquitectura limpia (Clean Architecture).</br> 
A continuación se muestra los aspectos más importantes del Proyecto. 


## Estructura del Proyecto
<br/>
```
app 
 └ src                              
    └ controllers                           → Se definen las rutas del proyecto
    └ core                          
       └ abstracts                          → Se elaboran clases abstractas para definir las funcionalides del sistema 
         └ data-services.abstract.ts        → Se definen las entidades que pueden ocupar el repositorio generico.
         └ generic-repository.abstract.ts   → Repositorio Genérico: Se definen todas las funcionalidades comunes en todas las entidades del sistema.
       └ constants                          → Contiene funciones y contantes que se pueden usar de manera global dentro de la carpeta core.
       └ dtos                               → Contiene clases DTO que permiten validar los datos y pasar información entre diferentes capas del clean architecture.
       └ entities                           → Se definen todas las clases (entidades) del sistema web
       └ validators                         → Contiene validadores específicos para un campo de los DTOs. (ej: validación de cédula)
    └ frameworks                            → Contiene librerías y herramientas para la conexión a BBDD, Autenticación, etc.
       └ auth                               → Módulo que contiene configuraciones de la autenticación del sistema. Se usa passport y jwt.
       └ database                           → Módulo que contiene configuraciones del ORM para BBDD (TypeORM)
         └ models                           → Se definen todos los modelos (entidades) para 'mapearlos' mediante el ORM.
         └ database-config.ts               → Archivo de Configuraciones para la BBDD en diferentes entornos (Desarrollo, Pruebas, Producción)
         └ database-data-services.module.ts → Módulo de la BBDD.
         └ database-generic.repository.ts   → Implementación de los métodos(funcionalidades) del sistema(Hereda del archivo generic-repository.abstract.ts)
         └ database.services.service.ts     → Servicio del módulo de BBDD. Se implementan las entidades definidas en el archivo data-services.abstract.ts
    └ helpers                               → Contiene archivos que permitan ayudar en las funcionalides del sistema. Son globales
    └ services                              → Contiene los módulos elorados en frameworks para ser usados dentro del módulo principal del sistema web.
    └ use-cases                             → Contiene los casos de uso del sistema. Se recomienda separlos por entidades.
      └ entity-factory.service.ts           → Se encarga de convertir los objetos DTO recibidos en los controladores(rutas) en entidades
      └ entity.use-cases.module.ts          → Módulo del caso de uso. Se usará dentro del módulo principal del sistema.
      └ entity-use-cases.ts                 → Contiene todos los casos de uso que se implementarán dentro de la entidad.
    └ app.module.ts                         → Módulo principal de la aplicación. Se deben importar todas los módulos de los casos de uso y los controladores
    └ main.ts                               → Archivo principal del proyecto.
 └ test                                     → Contiene los archivos para pruebas de integración del sistema. 
```

## Instalación del proyecto
<br/>
```bash
$ npm install
```

## Ejecución del proyecto
Para ejecutar el proyecto, primero se debe crear un archivo de variables de entorno (.env), se puede usar la configuración del archivo ```.env.example``` y crear 
una base de datos con el nombre de la variable ```DB_NAME_DEVELOPMENT``` para el entorno de desarrollo y ```DB_NAME_TEST``` para el entorno de pruebas.

<br/>
```bash
# desarrollo
$ npm run start

# modo watch (recomendado)
$ npm run start:dev

# modo producción 
$ npm run start:prod
```

## Ejecución de Pruebas
<br/>
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

## Creación de módulos
Para crear un nuevo módulo dentro del sistema se deben seguir los siguientes pasos:

### 1. Creación de la Entidad 
Para empezar, se debe crear un archivo dentro de la carpeta entities (```src/core/entities```) con los atributos correspondientes. Es importante considerar que los atributos especificados deben ser los mismos que en el modelo a 'mapear' en la BBDD.

<br/>
*Archivo entity.entity.ts*
<br/>
```
export class Entity {
    id: number;
    atributte1: string;
    atributte2: string;
    ....
}
```

### 2. Creación del DTO 
Un DTO es un objeto que define cómo se enviarán los datos a través de la red. En Nest, se recomienda su uso para enviar los datos del cuerpo de la petición. ([Más información aquí](https://docs.nestjs.com/controllers#request-payloads)). Mediante los DTO, es posible validar los datos en caso de que se vaya crear uno nuevo registro de un modelo. En caso de que se necesite tener un DTO sin que los campos sean requiridos, es posible crear una nueva clase DTO que herede de la clase `PartialType`. <br/> 
A continuación se muestra un ejemplo de un DTO.

<br/>
*Archivo entity.dto.ts*
<br/>
```
import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateEntityDto {
    @IsString({ message: 'Mensaje de Validación' })
    @IsNotEmpty({ message: 'Mensaje de Validación' })
    attribute: string;

    @IsString({ message: 'Mensaje de Validación' })
    @IsNotEmpty({ message: 'Mensaje de Validación' })
    attribute1: string;
    
    ...
}

export class UpdateEntityDto extends PartialType(CreateEntityDto) { }
```

### 3. Creación de una Abstracción
En caso de que la entidad únicamente vaya a tener funcionalidades de un CRUD básico, es posible no tomar en cuenta este paso. Ahora bien, en caso de que se requiera funcionalidades específicas de esa entidad (Consultar por fechas, etc) se debe generar un clase abstracta con las funcionalidades específicas que se desea implementar.<br/>  
A continuación se muestra un ejemplo.

<br/>
*Archivo entity-repository.service.ts*
<br/>
```
import { Entity } from "../entities";

export abstract class IEntityServices {
    abstract methodEspecificEntity1(entity: Entity) : Promise<Entity>;
    abstract methodEspecificEntity2(): Promise<any>;
    
    ...
}
```

**Importante**: Para que la entidad pueda contar con las funcionalidades básicas, en el archivo `src/core/abstracts/data-services.abstract.ts` se debe incluir un atributo de la entidad de la siguiente manera.

<br/>
*Archivo data-services.abstract.ts*
<br/>
```
import { User } from "../entities";
--> import { Entity } from "../entities";
import { IGenericRepository } from "./generic-repository.abstract";

export abstract class IDataServices {
    abstract users: IGenericRepository<User>;
    ---> abstract entities: IGenericRepository<Entity>;
}
```

### 4. Creación de Casos de Uso
Para crear los casos de uso de la entidad, se debe crear una carpeta con el nombre de la entidad en el directorio (`src/use-cases`). Luego, se debe generar un archivo denominado *Factory* que permitirá transformar el objeto DTO a un objeto de la entidad correspondiente para que se pueda trabajar con la misma.

<br/>
*Archivo entity-factory.service.ts*
<br/>

```
import { Injectable } from "@nestjs/common";

import { CreateEntityDto } from "../../core/dtos";
import { Entity } from "../../core/entities";

@Injectable()
export class EntityFactoryService {
    createEntity(createEntityDto: CreateEntityDto) {
        const entity = new Entity();
        entity.attribute1 = createEntityDto.attribute1;
        entity.attribute2 = createEntityDto.attribute2;
        ...
        return user;
    }
}
```

Tras esto, se genera el archivo de casos de uso de la entidad. En el siguiente código de ejemplo, es importante considerar que si las entidades no incluyen funcionalidades específicas (diferentes a las funcionalidades del CRUD) no es necesario importar el archivo `entity-repository.service.ts` ni hacer uso del mismo.

<br/>
*Archivo entity.use-cases.ts*
<br/>
```
import { Injectable } from "@nestjs/common";

import { IDataServices } from "../../core/abstracts";
import { IEntityServices } from "../../core/abstracts";
import { CreateEntityDto } from "../../core/dtos";
import { EntityFactoryService } from "./entity-factory.service";

@Injectable()
export class EntityUseCases {
    constructor(
        private dataServices: IDataServices,
        private entityService: IEntityServices, 
        private entityFactoryService: EntityFactoryService
    ) { }

    async createEntity(createEntityDto: CreateEntityDto) {
        const entity = await this.entityFactoryService.createEntity(createEntityDto);        
        return this.dataServices.entities.create(entity);
    }

    async getAllEntities() {
        return this.dataServices.entities.getAll();
    }

    ....
   ---> Funcionalidades específicas
    getEntititesByDate() {
        return this.entityServices.methodEspecificEntity1();
    }
}
```

Luego se crea el archivo para exportar el módulo del caso de uso de la entidad. En caso de que se tengan funcionalidades específicas, se debe crear e importar el servicio de dicho módulo, que se creará más adelante. 

<br/>
*Archivo entity.use-cases.module.ts*
<br/>
```
import { Module } from "@nestjs/common";

import { EntityServicesModule } from "../../services/entity-services.module";
import { DataServicesModule } from "../../services/database-services.module";
import { EntityFactoryService } from "./entity-factory.service";
import { EntityUseCases } from "./entity.use-cases";

@Module({
    imports: [DataServicesModule, EntityServicesModule],
    providers: [EntityFactoryService, EntityUseCases],
    exports: [EntityFactoryService, EntityUseCases]
})
export class EntityUseCasesModule { }
```

### 5. Creación de Controladores
En Nest, los controladores son responsables de manejar las solicitudes entrantes y devolver las respuestas al cliente([Más información aquí](https://docs.nestjs.com/controllers)). Para crear un nuevo controlador, en la carpeta (`src/controllers`) se debe generar un archivo similar al que se muestra a continuación.

*Nota*: En caso de que el acceso a la ruta sea restringido, se debe agregar el decorador `@UseGuard(JwtAuthGuard)`

<br/>
*Archivo entity.controller.ts*
<br/>
```
import { Body, Controller, Post, Get } from "@nestjs/common";
import { CreateEntityDto } from "../core/dtos";
import { EntityUseCases } from "../use-cases/entity";

@Controller('/api/entity')
export class EntityController {
    constructor(private entityUseCases: EntityUseCases) { }

    //Acceso total
    @Post('/create')
    createEntity(@Body() createEntityDto: CreateEntityDto) {        
        return this.entityUseCases.createEntity(createEntityDto);
    }

    //Acceso Restringido
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    getAllEntities() {
        return this.authUseCases.getAllEntities();
    }
}
```

### 6. Incluir el módulo de casos de uso y el controlador en el módulo principal
Se debe incluir el módulo de casos de uso y el controlador de la entidad en el módulo principal de la aplicación (`app.module.ts`)

<br/>
*Archivo app.module.ts*
<br/>
```
import { Module } from '@nestjs/common';

import { AuthServicesModule } from './services/auth-services.module';
import { DataServicesModule } from './services/database-services.module';
---> import { EntityUseCasesModule } from './use-cases/entity';
---> import { EntityController } from './controllers/entity';


@Module({
  imports: [
    DataServicesModule,
    AuthServicesModule,
---> EntityUseCasesModule  
  ],
  controllers: [
    AuthController,
---> EntityController    
  ],
  providers: [],
})
export class AppModule {}
```

### 7. Creación de Modelo de la Entidad para Mapeo en la BBDD
Dentro del directorio `src/framworks/database/models` se debe crear una clase que será usada como modelo para hacer el mapeo de la entidad en la BBDD. Un modelo se define de la siguiente manera. 

**Importante**: En caso de que la entidad se relacione con otras entidades dentro del sistema, se puede utilizar los decoradores ` @OneToMany`, `@ManyToMany`, entre otras. [Más información aquí](https://docs.nestjs.com/techniques/database#relations)

<br/>
*Archivo entity.model.ts*
<br/>
```
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Entity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    attributte1: string;

    @Column()
    atributte2: boolean;

    ....
    Relations
  @OneToMany(type => Entity2, entity2 => entity2.entity1)
  entities2: Entity2[];
}
```

### 8. Configuraciones Adicionales
Para que la entidad incluya las funcionalidades comunes en todas las entidades (CRUD) se debe agregar un objeto de la entidad en el archivo `src/framworks/database/database.services.service.ts` de la siguiente manera.

<br/>
*Archivo database.services.service.ts*
<br/>
```
import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IDataServices } from "../../core/abstracts";
import { DatabaseGenericRepository } from "./database-generic.repository";
import { User } from "./models";
---> import { Entity } from "./models";


@Injectable()
export class DatabaseDataServices implements IDataServices, OnApplicationBootstrap {
    users: DatabaseGenericRepository<User>;
--->entities: DatabaseGenericRepository<Entity>;

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
 -----> @InjectRepository(Entity)
        private entityRepository: Repository<Entity>,
    ) { }

    onApplicationBootstrap() {
        this.users = new DatabaseGenericRepository<User>(this.userRepository);
  ----> this.entities = new DatabaseGenericRepository<Entity>(this.entityRepository);   
    }
}
```

Por otra parte, en caso de que la entidad incluya funcionalidades específicas, dentro del directorio `src/framworks/database` se debe crear una carpeta con el nombre de la entidad, la cual incluirá dos archivos. El archivo `entity-services.service.ts` incluirá toda la lógica definida dentro de las abstracciones del paso 3 (archivo `entity-repository.service.ts`), de la siguiente manera.

<br/>
*Archivo entity-service.service.ts*
<br/>
```
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { IEntityServices, IDataServices } from "../../core/abstracts";
import { Entity } from "../database/models";

@Injectable()
export class EntityServices implements IEntityServices {
    constructor(
        //Se puede usar las funcionalidades básicas importando IDataServices
        private dataServices: IDataServices,
        
  ----->@InjectRepository(Entity),
        private entityRepository: Repository<Entity>,
    ) { }

    //Método específico a implementar 
    async methodEspecificEntity1(entity: Entity): Promise<User> {  
        //Usando funcionalides de DataServices (Funcionalidades generales)
        const newUser = await this.dataServices.users.create(user);
        
        //Usando el repositorio de la entidad
  ----->const newUser = this.userRepository.save(user);
        return newUser;
    }
}
```

Luego de ello, se debe generar el archivo `entity-service.module.ts` el cual permitirá crear un módulo para utilizarlo en otras partes de la aplicación.

<br/>
*Archivo entity-service.module.ts*
<br/>
```
import { Module } from '@nestjs/common';
import { IEntityServices } from '../../core/abstracts';
import { DatabaseDataServicesModule } from '../database/database-data-services.module';

import { EntityServices } from './entity-services.service';

@Module({
    imports: [
        DatabaseDataServicesModule,
    ],
    providers: [
        {
            provide: IEntityServices,
            useClass: EntityServices
        },
    ],
    exports: [IEntityServices]
})
export class EntityModule { }
```

Finalmente, en el directorio `src/services` se debe crear un archivo `entity.services.module.ts`, donde se generará un módulo que deberá ser importado dentro del módulo principal.

<br/>
*Archivo entity-services.module.ts*
<br/>
```
import { Module } from '@nestjs/common';
import { EntityModule } from '../frameworks/entity/entity-service.module';

@Module({
    imports: [EntityModule],
    exports: [AEntityModule]
})
export class EntityServicesModule { }
```


<br/>
*Archivo app.module.ts*
<br/>
```
import { Module } from '@nestjs/common';

import { AuthServicesModule } from './services/auth-services.module';
import { DataServicesModule } from './services/database-services.module';
import { EntityUseCasesModule } from './use-cases/entity';
import { EntityController } from './controllers/entity';
---> import { EntityServicesModule } from './services/entity-services.module';

@Module({
  imports: [
    DataServicesModule,
    AuthServicesModule,
    EntityUseCasesModule,
--->  EntityServicesModule   
    
  ],
  controllers: [
    AuthController,
    EntityController    
  ],
  providers: [],
})
export class AppModule {}
```

## Pruebas de Módulos
Para poder realizar una prueba End-to-End(e2e) del módulo, dentro del directorio `src/test` se debe crear un archivo de nombre `entity.e2e-spec.ts` el cual incluirá el siguiente código.

<br/>
*Archivo entity.e2e-spec.ts*
<br/>
```
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

import { DataServicesModule } from '../src/services/database-services.module';
import { AuthServicesModule } from '../src/services/auth-services.module';
import { EntityUseCasesModule } from '../src/use-cases/entities';
import { EntityController } from '../src/controllers/entity.controller';
import { AuthController } from '../src/controllers/auth.controller';
import { AuthUseCasesModule } from '../src/use-cases/auth';
import { Entity } from '../src/core/entities';

let app: INestApplication;
let token: string;
let entity: Entity;

beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [DataServicesModule, EntityUseCasesModule, AuthUseCasesModule, AuthServicesModule],
        controllers: [AuthController, EntityController]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    useContainer(app.select(AuthServicesModule), { fallbackOnErrors: true });

    let response = await request(app.getHttpServer())
        .post('/api/auth/signin')
        .send({
            "username": "user",
            "password": "password",
        });

    token = response.body.token;
    entity = response.body.data;
});

//Probar funcionalidades
describe('Obtener Listado de Entidades', () => {
    it('Obtener Listado de Entidades. Flujo Ideal', () => {        
        return request(app.getHttpServer())
            .get(`/api/entity/all`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);
    });
});

describe('Actualizar Usuario', () => {    
    it('Actualizar información usuario. Flujo Ideal', () => {
        return request(app.getHttpServer())
            .put(`/api/entity/update/${entity.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "name": "Entidad",
                "description": "Descripción de atributo",

                ...
            }).expect(200);
    });
});

afterAll(async () => {
    await app.close();
});
```

Luego se incluye el nombre de la entidad en el archivo `test-sequencer.js` ubicado en la raíz de la siguiente manera.

<br/>
*Archivo test-sequencer.js*
<br/>

```
const Sequencer = require('@jest/test-sequencer').default;
class CustomSequencer extends Sequencer {
    sort(tests) {
        let arrayTests = Array.from(tests);
        let orderTests = [];

        for (let i = 0; i < arrayTests.length; i++) {
            let test_path = (process.platform === 'win32') ? arrayTests[i].path.split('\\test\\') : arrayTests[i].path.split('test/');
            let test_name = test_path[1].split('.');
            switch (test_name[0]) {
                case "auth":
                    orderTests[0] = arrayTests[i];
                    break;
                case "user":
                    orderTests[1] = arrayTests[i];
                    break;
          ----> case "entity":
                    orderTests[2] = arrayTests[i];
                    break;    
                default:
                    break;
            }
        }
        return orderTests;
    }
}

module.exports = CustomSequencer;
```

Finalmente se ejecuta el siguiente comando.

<br/>
```
# e2e tests
$ npm run test:e2e
```


