import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app/app.module';
import { initSwagger } from './swagger/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import * as helmet from 'helmet';
import { LoginInfoService } from './app/log/login-info/login-info.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
// import { LoggerService } from './common/services/logger.service';
// import { createLogger } from 'winston';
// import { WinstonConfigService } from './common/services/winston.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);
  const PORT = config.get('app.PORT');

  // const loggerService = new LoggerService(
  //   createLogger(new WinstonConfigService().createWinstonModuleOptions()),
  // );

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
