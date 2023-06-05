import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer, ValidationError } from 'class-validator';
import { EventEmitter } from 'events';

// import { EventsModule } from './frameworks/sockets/events/events.module';
import { errorClientResponse } from './helpers/responses';

async function bootstrap() {
  const port = process.env.PORT ? process.env.PORT : 3000;

  const app = await NestFactory.create(AppModule);

  //Configuración Cors
  app.enableCors({ 'origin': true, 'credentials': true });
  
  //Configuración Validadores
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => {
      return new BadRequestException(errorClientResponse('Campos erróneos o faltantes en el cuerpo de la petición', validationErrors[0].constraints));
    }
  }));

  //Configuraciones Swagger (Documentación) 
  const config = new DocumentBuilder()
    .setTitle('Mover U Documentación API REST')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // Configuración de Swagger para los sockets
  const socketOptions = new DocumentBuilder()
    .setTitle('Mis sockets')
    .setVersion('1.0')
    .build();
  /*
  const socketDocument = SwaggerModule.createDocument(
    await NestFactory.create(EventsModule),
    socketOptions,
  );
  SwaggerModule.setup('api', app, socketDocument);
  */

  // EventEmitter.defaultMaxListeners = 15; 
  await app.listen(port);
}
bootstrap();
