import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  ConfigModule.forRoot();

  console.log(process.env.MYSQL_HOST);

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = process.env.BACKEND_PORT ?? process.env.PORT;

  console.log(
    `Listened on PORT ${port} (from variable ${
      Boolean(process.env.BACKEND_PORT)
        ? 'process.env.BACKEND_PORT'
        : 'process.env.PORT'
    })`,
  );

  await app.listen(port);
}
bootstrap();
