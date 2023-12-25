import { Injectable } from '@nestjs/common';
import { CreateTypeormDto } from './dto/create-typeorm.dto';
import { UpdateTypeormDto } from './dto/update-typeorm.dto';

@Injectable()
export class TypeormService {
  create(createTypeormDto: CreateTypeormDto) {
    return 'This action adds a new typeorm';
  }

  findAll() {
    return `This action returns all typeorm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeorm`;
  }

  update(id: number, updateTypeormDto: UpdateTypeormDto) {
    return `This action updates a #${id} typeorm`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeorm`;
  }
}
