import { Module } from '@nestjs/common';
import { TypeormService } from './typeorm.service';
import { TypeormController } from './typeorm.controller';
import { Typeorm } from './entities/typeorm.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Typeorm]), // 通过TypeOrmModule.forFeature()方法引入实体类
  ],
  controllers: [TypeormController],
  providers: [TypeormService],
})
export class TypeormModule {}
