import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { routes } from './routes';
import { SystemModule } from './system/system.model';
import { AuthService } from './auth/auth.service';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    RouterModule.forRoutes(routes),
    SystemModule,
    AuthService,
    ConfigModule.load(
      path.resolve(__dirname, '../config', '**/!(*.d).{ts,js}'),
      {
        path: path.resolve(process.cwd(), `.env.${ENV}`),
      },
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
