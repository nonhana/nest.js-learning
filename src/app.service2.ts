// src/app.service.ts
// 主要是写业务逻辑的，比如数据库的增删改查
import { Injectable } from '@nestjs/common';

// @Injectable() 装饰器，用来标记一个类为可注入的，也就是可以被其他类注入的类
@Injectable()
export class AppService2 {
  getHello(): string {
    return 'AppService2';
  }

  getNonHana(): string {
    return 'Hello NonHana!';
  }
}
