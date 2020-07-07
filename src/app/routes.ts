import { Routes } from 'nest-router';
import { SystemModule } from './system/system.model';
import { UserModule } from './system/user/user.module';

export const routes: Routes = [
  {
    path: '/system',
    module: SystemModule,
    children: [{ path: '/user', module: UserModule }],
  },
];
