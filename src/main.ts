import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(new ValidateInputPipe());
  const config = new DocumentBuilder()
    .setTitle('Ejercicio 1 Examen - Backend')
    .setDescription(
      'Esta API consiste en agregar usuarios, iniciar sesión y realizar las operaciones sobre los productos (Crear, Leer, Actualizar y Eliminar)',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Inicia sesión con el endpoint login o registrate con el endpoint signup, después agrega el contenido de la llave Token`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);
  await app.listen(3000);
}

bootstrap();
