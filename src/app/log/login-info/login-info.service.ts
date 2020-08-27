import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInfo } from './login-info.schema';

@Injectable()
export class LoginInfoService {
  constructor(@InjectModel(LoginInfo.name) private model: Model<LoginInfo>) {}

  async create(params: Partial<LoginInfo>): Promise<LoginInfo> {
    const createdCat = new this.model(params);
    return await createdCat.save();
  }

  async findAll(): Promise<LoginInfo[]> {
    return await this.model.find().exec();
  }
}
