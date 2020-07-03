import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UserDto } from './dto/user.dto';

@Crud({
  model: {
    type: UserEntity,
  },
  dto: {
    create: UserDto,
    update: UserDto,
  },
})
@Controller('user')
export class UserController {
  constructor(public service: UserService) {}
}
