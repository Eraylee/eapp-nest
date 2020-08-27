import { Module } from '@nestjs/common';
import { LoginInfoController } from './login-info.controller';
import { LoginInfoService } from './login-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginInfo } from './login-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'LoginInfo', schema: LoginInfo }]),
  ],
  controllers: [LoginInfoController],
  providers: [LoginInfoService],
  exports: [LoginInfoService],
})
export class LoginInfoModule {}
