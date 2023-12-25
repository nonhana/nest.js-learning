import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  @ApiProperty({ example: 'non_hana' }) // ApiProperty可以用来设置swagger文档的字段描述
  name: string;
  @ApiProperty({ example: 18 }) // ApiProperty可以用来设置swagger文档的字段描述
  age: number;
}
