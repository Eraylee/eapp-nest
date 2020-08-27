import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { initSwagger } from './swagger/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ConfigService } from 'nestjs-config';
import * as helmet from 'helmet';
import { LoginInfoService } from './app/log/login-info/login-info.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('app.PORT');
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      skipMissingProperties: true,
      forbidUnknownValues: true,
    }),
  );
  initSwagger(app);
  const loginInfoService = app.get<LoginInfoService>(LoginInfoService);
  app.useGlobalInterceptors(new LoggingInterceptor(loginInfoService));
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
