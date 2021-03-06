import { Routes } from 'nest-router';
import { SystemModule } from './system/system.model';
import { UserModule } from './system/user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './system/role/role.module';
import { MenuModule } from './system/menu/menu.module';
import { DataDictionaryModule } from './system/data-dictionary/data-dictionary.module';

export const routes: Routes = [
  {
    path: '/system',
    module: SystemModule,
    children: [
      { path: '/user', module: UserModule },
      { path: '/role', module: RoleModule },
      { path: '/menu', module: MenuModule },
      { path: '/dataDictionary', module: DataDictionaryModule },
    ],
  },
  {
    path: '/auth',
    module: AuthModule,
  },
];
