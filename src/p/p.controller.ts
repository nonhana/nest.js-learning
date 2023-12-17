import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe, // 把参数转为number类型的管道，可以给number、string、boolean使用
  ParseUUIDPipe, // 把参数转为string类型的管道，专门给uuid使用
} from '@nestjs/common';
import { PService } from './p.service';
import { CreatePDto } from './dto/create-p.dto';
import { UpdatePDto } from './dto/update-p.dto';
import * as uuid from 'uuid';

console.log(uuid.v4());
@Controller('p')
export class PController {
  constructor(private readonly pService: PService) {}

  @Post()
  create(@Body() createPDto: CreatePDto) {
    return this.pService.create(createPDto);
  }

  @Get()
  findAll() {
    return this.pService.findAll();
  }

  @Get(':id')
  // 使用ParseIntPipe管道对参数进行类型转换，直接将对应的转换器作为@params()的第二个参数传入即可。
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.pService.findOne(+id);
  }

  @Get('/uuid/:uuid')
  // 使用ParseUUIDPipe管道对参数进行类型转换，直接将对应的转换器作为@params()的第二个参数传入即可。
  findOneByUuid(@Param('uuid', ParseUUIDPipe) uuid: number) {
    console.log(typeof uuid);
    return this.pService.findOne(+uuid);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePDto: UpdatePDto) {
    return this.pService.update(+id, updatePDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pService.remove(+id);
  }
}
