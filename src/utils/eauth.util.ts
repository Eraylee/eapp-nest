import { Enforcer, newEnforcer } from 'casbin';
import TypeORMAdapter from 'typeorm-adapter';
import * as path from 'path';
import { ConfigService } from 'nestjs-config';

export class Eauth {
  static enforcer: Enforcer;
  /**
   * 初始化
   */
  static async init(): Promise<void> {
    const a = await TypeORMAdapter.newAdapter({
      type: ConfigService.get('database.type'),
      host: ConfigService.get('database.host'),
      port: ConfigService.get('database.port'),
      username: ConfigService.get('database.username'),
      password: ConfigService.get('database.password'),
      database: ConfigService.get('database.database'),
    });
    const filePath = path.join(__dirname, '../../casbin_conf/model.conf');
    Eauth.enforcer = await newEnforcer(filePath, a);
    // Load the policy from DB.
    await Eauth.enforcer.loadPolicy();
  }

  /**
   * 检查权限
   * @param roleCode 角色编码
   * @param url 地址
   * @param method 方法
   */
  static checkPermission(
    roleCode: string,
    url: string,
    method: string,
  ): Promise<boolean> {
    return this.enforcer.enforce(roleCode, url, method);
  }
}
