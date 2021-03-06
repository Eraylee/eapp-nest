import { DeleteResult, Repository, Like } from 'typeorm';
import { PaginationResult } from '../interfaces/result.interface';
import { OrderTypes } from '../enums';
import { DeletBatcheDto, PaginationDto } from '@/common/dtos/base.dto';

export abstract class CRUDService<T> {
  protected constructor(protected readonly repo: Repository<T>) {}
  /**
   * 查询单条数据
   * @param id
   */
  public async get(id: number): Promise<T> {
    return await this.repo.findOne(id);
  }
  /**
   * 分页查询
   * @param query
   */
  public async getPage<D extends PaginationDto>({
    pageSize,
    pageNum,
    orderType,
    orderColumn,
    ...query
  }: D): Promise<PaginationResult<T>> {
    const take = pageSize ?? 10;
    const page = pageNum ?? 1;
    const skip = take * (page - 1);
    const _orderType: OrderTypes = orderType ?? OrderTypes.DESC;
    const _orderColumn = orderColumn ?? 'createdAt';
    const order: any = {
      [_orderColumn]: _orderType,
    };
    const where = {};
    Reflect.ownKeys(query).forEach(queryKey => {
      const queryValue = query[queryKey];
      if (queryKey === 'parentId') {
        Object.assign(where, { parent: { id: queryValue } });
      } else {
        where[queryKey] = Like(`%${queryValue}%`);
      }
    });
    const [data, total] = await this.repo.findAndCount({
      order,
      skip,
      take,
      where,
    });
    return {
      data,
      total,
      pageNum: page,
      pageSize: take,
      maxPage: Math.ceil(total / take),
    };
  }
  /**
   * 创建
   * @param dto
   */
  public async create<D>(dto: D): Promise<T> {
    return await this.repo.save(this.repo.create(dto));
  }
  /**
   * 修改
   * @param id
   * @param dto
   */
  public async update<D extends { id: number }>(dto: D): Promise<T> {
    const res = await this.get(dto.id);
    Object.assign(res, dto);
    return await this.repo.save(res);
  }
  /**
   * 批量删除
   * @param ids
   */
  public async deleteBatch(params: DeletBatcheDto): Promise<DeleteResult> {
    return this.repo.softDelete(params.ids);
  }
}
