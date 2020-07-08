import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { initSwagger } from './swagger/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ElogMiddleware } from './middlewares/elog.middleware';

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
  app.use(new ElogMiddleware().use);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
  return PORT;
}
bootstrap().then(port => {
  new Logger('Nest server').log(
    `Nest server listening on http://localhost:${port}`,
  );
});
