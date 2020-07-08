import { IsArray, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { OrderTypes } from '@/enums';

/**
 * 批量删除
 */
export class DeleteDto {
  @ApiProperty({ description: 'ids' })
  @IsArray()
  readonly ids: number[];
}

/**
 * 分页查询
 */
export class PaginationDto {
  @ApiProperty({ required: false, description: '页码' })
  @IsNumber()
  @Transform(value => parseInt(value))
  readonly pageNum?: number;

  @ApiProperty({ required: false, description: '每页显示多少' })
  @IsNumber()
  @Transform(value => parseInt(value))
  readonly pageSize?: number;

  @ApiProperty({ required: false, description: '排序字段' })
  readonly orderColumn?: string;

  @ApiProperty({ required: false, description: '排序方式' })
  @IsEnum(OrderTypes)
  readonly orderType?: OrderTypes;
}
