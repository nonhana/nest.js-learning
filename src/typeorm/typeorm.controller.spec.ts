import { Test, TestingModule } from '@nestjs/testing';
import { TypeormController } from './typeorm.controller';
import { TypeormService } from './typeorm.service';

describe('TypeormController', () => {
  let controller: TypeormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeormController],
      providers: [TypeormService],
    }).compile();

    controller = module.get<TypeormController>(TypeormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
