import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { initSwagger } from './swagger/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 8000;
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      forbidUnknownValues: true,
    }),
  );
  initSwagger(app);
  await app.listen(PORT);
  return PORT;
}
bootstrap().then(port => {
  new Logger('Nest server').log(
    `Nest server listening on http://localhost:${port}`,
  );
});
