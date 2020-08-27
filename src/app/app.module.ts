import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import * as path from 'path';
import { routes } from './app.routes';
import { SystemModule } from './system/system.model';
import { LogModule } from './log/log.model';
import { AuthModule } from './auth/auth.module';
import { CasbinModule } from './casbin/casbin.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, '../configs', '**/!(*.d).{ts,js}'),
      {
        path: path.resolve(process.cwd(), `.env.${ENV}`),
      },
    ),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/log'),
    RouterModule.forRoutes(routes),
    SystemModule,
    LogModule,
    AuthModule,
    CasbinModule,
  ],                                      
})
export class AppModule {}
