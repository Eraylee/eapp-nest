import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInfo } from './login-info.schema';
import { UAParser } from 'ua-parser-js';
import { PaginationResult } from '@/interfaces/result.interface';
import { PaginationDto } from '@/common/base/base.dto';
import { OrderTypes } from '@/enums';

@Injectable()
export class LoginInfoService {
  constructor(@InjectModel(LoginInfo.name) private model: Model<LoginInfo>) {}
  /**
   * 新增
   * @param params
   * @param agent
   */
  async create(params: Partial<LoginInfo>, agent: string): Promise<LoginInfo> {
    const uaParser = new UAParser(agent);
    const os = uaParser.getOS();
    const browser = uaParser.getBrowser();
    const createdCat = new this.model({ ...params, os, browser });
    return await createdCat.save();
  }
  /**
   * 查询全部
   */
  async findAll(): Promise<LoginInfo[]> {
    return await this.model.find().exec();
  }
  /**
   * 通过id查询
   * @param id
   */
  async findById(id: string): Promise<LoginInfo> {
    return await this.model.findById(id);
  }

  async queryPage({
    pageSize,
    pageNum,
    orderType,
    orderColumn,
  }: PaginationDto): Promise<PaginationResult<LoginInfo>> {
    const take = pageSize ?? 10;
    const page = pageNum ?? 1;
    const skip = take * (page - 1);
    const _orderType = orderType ?? OrderTypes.DESC;
    const _orderColumn = orderColumn ?? 'createdAt';
    const order: any = {
      [_orderColumn]: _orderType,
    };
    const total = await this.model.count({}).exec();
    const data = await this.model
      .find()
      .skip(skip)
      .limit(take)
      .sort(order)
      .exec();
    return {
      data,
      total,
      pageNum: page,
      pageSize: take,
      maxPage: Math.ceil(total / take),
    };
  }
}
