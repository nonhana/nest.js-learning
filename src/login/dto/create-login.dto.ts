/* 
  DTO: Data Transfer Object
  顾名思义，数据传输对象，用于定义数据传输的格式以及各个字段的验证规则
  这个验证规则的定义可以配合各种第三方的验证库去使用，如 class-validator、joi 等
  在这里，我们定义了一个 CreateLoginDto 类
*/
import { IsNotEmpty, IsString, Length, IsNumber } from 'class-validator';

export class CreateLoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 10, {
    message: '用户名长度为2-10个字符',
  })
  name: string;
  @IsNotEmpty()
  @IsNumber()
  age: number;
}
