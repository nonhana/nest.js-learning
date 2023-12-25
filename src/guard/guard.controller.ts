import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards, // UseGuards主要是用来使用守卫的
  // SetMetadata, // SetMetadata主要是用来设置元数据的，可以加在每个路由上，也可以加在控制器上
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import { Role, ReqUrl } from './role/role.decorator';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('guard')
@ApiBearerAuth() // ApiBearerAuth可以用来设置swagger文档的请求头描述
@ApiTags('守卫相关路由') // ApiTags可以用来设置swagger文档的分组标签
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  // @SetMetadata('role', ['admin']) // 在请求这个路由时，会先经过守卫，守卫会调用反射器的get方法，获取元数据
  @Role('admin') // 使用自定义装饰器的方式设置元数据
  @ApiOperation({ summary: '获取所有守卫', description: '一些相关的描述' }) // ApiOperation可以用来设置swagger文档的接口描述
  @ApiQuery({
    name: 'page',
    description: '页码',
    required: false,
    type: 'number',
  }) // ApiQuery可以用来设置swagger文档的查询参数描述
  @ApiResponse({
    status: 200,
    description: '获取成功',
    type: [CreateGuardDto],
  }) // ApiResponse可以用来设置swagger文档的响应描述
  findAll(@ReqUrl() url: string) {
    console.log('url', url);
    return this.guardService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    description: '守卫id',
    required: true,
    type: 'string',
  }) // ApiParam可以用来设置swagger文档的动态参数描述
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
