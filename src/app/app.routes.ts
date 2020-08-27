import { Routes } from 'nest-router';
import { SystemModule } from './system/system.model';
import { UserModule } from './system/user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './system/role/role.module';
import { MenuModule } from './system/menu/menu.module';
import { LogModule } from './log/log.model';
import { LoginInfoModule } from './log/login-info/login-info.module';

export const routes: Routes = [
  {
    path: '/system',
    module: SystemModule,
    children: [
      { path: '/user', module: UserModule },
      { path: '/role', module: RoleModule },
      { path: '/menu', module: MenuModule },
    ],
  },
  {
    path: '/log',
    module: LogModule,
    children: [{ path: '/loginInfo', module: LoginInfoModule }],
  },
  {
    path: '/auth',
    module: AuthModule,
  },
];
