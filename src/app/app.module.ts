import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { UserModule } from './system/user/user.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    UserModule,
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
