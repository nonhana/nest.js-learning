// src/app.controller.ts
// 主要是配置service中的方法的路由
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service'; // 引入服务
import { UserService } from './user/user.service'; // 引入其他模块的服务

@Controller('get') // 路由前缀
export class AppController {
  // appService是一个私有属性，它被注入到构造函数中，是IoC的一种体现
  // 在构造器中会自动的将AppService实例化
  constructor(
    // @Inject()装饰器，用来注入服务。
    // 它的参数是一个字符串，用来指定要注入的服务的名称。、
    // 如果你在服务中没有指定名称，那么它会默认使用类的名称。
    @Inject('MAIN_SERVICE') private readonly appService: AppService,
    // 可以指定多个服务
    @Inject('TEST') private readonly str: string,
    @Inject('FACTORY') private readonly factory: number,

    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Get('hello') // 具体的某个接口的路由
  getHello(): any {
    return this.appService.getNonHana();
    // return this.factory;
  }

  @Get('user')
  getUser(): any {
    // 如果要使用其他模块的服务，需要先在其相应的module中使用exports把这个服务改成共享模块
    return this.userService.findAll();
  }
}
