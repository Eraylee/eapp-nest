import { Module } from '@nestjs/common';
import { LoginInfoModule } from './login-info/login-info.module';

@Module({
  imports: [LoginInfoModule],
})
export class LogModule {}
