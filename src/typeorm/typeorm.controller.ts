import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeormService } from './typeorm.service';
import { CreateTypeormDto } from './dto/create-typeorm.dto';
import { UpdateTypeormDto } from './dto/update-typeorm.dto';

@Controller('typeorm')
export class TypeormController {
  constructor(private readonly typeormService: TypeormService) {}

  @Post()
  create(@Body() createTypeormDto: CreateTypeormDto) {
    return this.typeormService.create(createTypeormDto);
  }

  @Get()
  findAll() {
    return this.typeormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeormService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeormDto: UpdateTypeormDto) {
    return this.typeormService.update(+id, updateTypeormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeormService.remove(+id);
  }
}
