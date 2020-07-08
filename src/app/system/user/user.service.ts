import { Injectable, BadRequestException } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import pick from 'lodash/pick'
import * as crypto from 'crypto';
import { BaseService } from '@/common/base/base.service';
import { CreateUserDto, ResetPswDto, UpdateUserDto } from './user.dto';
import { ConfigService, InjectConfig } from 'nestjs-config';
import { JwtPayload } from '@/app/auth/jwt-payload.interface';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) readonly repo: Repository<UserEntity>,
    @InjectConfig() private readonly config: ConfigService,
  ) {
    super(repo);
  }
  /**
   * 验证用户
   * @param username
   * @param password
   */
  public async validate(
    username: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    return this.repo.findOne({
      username,
      password: this.buildPassword(password),
    });
  }
  /**
   * 新增用户
   * @param params
   */
  public async createUser(params: CreateUserDto): Promise<UserEntity> {
    const count = await this.repo.count({ username: params.username });
    if (count > 0) {
      throw new BadRequestException('用户已存在');
    }
    const user = new UserEntity();
    const password = this.buildPassword(
      this.config.get('app.DEFAULT_PASSWORD'),
    );
    Object.assign(user, { ...params, password });
    return this.repo.save(user);
  }
  /**
   * 重置密码
   * @param params
   */
  public async resetPassWord(params: ResetPswDto): Promise<UserEntity> {
    const user = await this.repo.findOne(params.id);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    const password = this.buildPassword(
      this.config.get('app.DEFAULT_PASSWORD'),
    );
    Object.assign(user, { password });
    return this.repo.save(user);
  }
  /**
   * 加密密码
   * @param password
   */
  private buildPassword(password: string): string {
    return crypto.createHmac('sha256', password).digest('hex');
  }

  /**
   * 更新个人用户信息
   * @param payload
   * @param params
   */
  public async updateProfile(
    payload: JwtPayload,
    params: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.repo.findOne(payload.id);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }
    const { nickname, phone, email } = params;
    Object.assign(user, { nickname, phone, email });
    return this.repo.save(user);
  }
}
