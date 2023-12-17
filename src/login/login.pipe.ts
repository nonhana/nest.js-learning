import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
// 从class-transformer中引入plainToInstance方法，用于将普通对象转换为类的实例
import { plainToInstance } from 'class-transformer';
// 从class-validator中引入validate方法，用于验证类的实例是否符合定义的规则
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    /* 
      使用plainToInstance函数将普通对象转换为类的实例。需要传入两个参数：
      - 第一个参数：类的类型，即类的构造函数。在nest.js中一般是dto文件中定义的类，对应的要识别的规则也是在这个类里面提前定义好的
      - 第二个参数：普通对象，即需要转换的对象(键值对)
    */
    const DTO = plainToInstance(metadata.metatype, value);
    const errors = await validate(DTO);
    console.log(errors);
    if (errors.length) {
      // 使用HttpException抛出异常。
      // HttpStatus.BAD_REQUEST状态码主要用于参数异常，为400
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
