import { Test, TestingModule } from '@nestjs/testing';
import { LoginInfoService } from './login-info.service';

describe('LoginInfoService', () => {
  let service: LoginInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginInfoService],
    }).compile();

    service = module.get<LoginInfoService>(LoginInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
