import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInfo } from './login-info.schema';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class LoginInfoService {
  constructor(@InjectModel(LoginInfo.name) private model: Model<LoginInfo>) {}

  async create(params: Partial<LoginInfo>, agent: string): Promise<LoginInfo> {
    const uaParser = new UAParser(agent);
    const os = uaParser.getOS();
    const browser = uaParser.getBrowser();
    const createdCat = new this.model({ ...params, os, browser });
    return await createdCat.save();
  }

  async findAll(): Promise<LoginInfo[]> {
    return await this.model.find().exec();
  }
}
