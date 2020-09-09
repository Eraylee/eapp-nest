import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@/common/base/base.dto';
import { DataDictionaryEntity } from './data-dictionary.entity';
/**
 * 分页查询
 */
export class QueryDataDictionaryDto extends PaginationDto
  implements Partial<DataDictionaryEntity> {
  @ApiProperty({
    description: '字典名称',
    required: false,
  })
  dictionaryName: string;

  @ApiProperty({
    description: '字典编码',
    required: false,
  })
  dictionaryCode: string;

  @ApiProperty({
    description: '字典值',
    required: false,
  })
  dictionaryValue: string;

  @ApiProperty({
    description: '父级id',
    required: false,
  })
  parentId: number;
}
/**
 * 新增
 */
export class CreateDataDictionaryDto implements Partial<DataDictionaryEntity> {
  @ApiProperty({
    description: '字典名称',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryName: string;

  @ApiProperty({
    description: '字典编码',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryCode: string;

  @ApiProperty({
    description: '字典值',
    required: false,
  })
  @IsDefined()
  @IsNotEmpty()
  dictionaryValue: string;

  @ApiProperty({
    description: '父级id',
    required: false,
  })
  parentId: number;
}

export class UpdateDataDictionaryDto implements Partial<DataDictionaryEntity> {
  @ApiProperty({
    description: 'id',
  })
  @IsDefined()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: '字典名称',
    required: false,
  })
  dictionaryName: string;

  @ApiProperty({
    description: '字典编码',
    required: false,
  })
  dictionaryCode: string;

  @ApiProperty({
    description: '字典值',
    required: false,
  })
  dictionaryValue: string;

  @ApiProperty({
    description: '父级id',
    required: false,
  })
  parentId: number;
}
