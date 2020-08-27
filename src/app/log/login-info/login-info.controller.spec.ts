import { Test, TestingModule } from '@nestjs/testing';
import { LoginInfoController } from './login-info.controller';

describe('LoginInfo Controller', () => {
  let controller: LoginInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginInfoController],
    }).compile();

    controller = module.get<LoginInfoController>(LoginInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
