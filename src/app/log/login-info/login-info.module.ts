import { Module } from '@nestjs/common';
import { LoginInfoController } from './login-info.controller';
import { LoginInfoService } from './login-info.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginInfo, LoginInfoSchema } from './login-info.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LoginInfo.name, schema: LoginInfoSchema },
    ]),
  ],
  controllers: [LoginInfoController],
  providers: [LoginInfoService],
  exports: [LoginInfoService],
})
export class LoginInfoModule {}
