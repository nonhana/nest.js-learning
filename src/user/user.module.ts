import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Logger } from 'src/middleware'; // 导入中间件

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 导出服务，这样其他模块就可以使用UserService这个服务了
})

// 如果要在模块中使用中间件，需要实现NestModule接口
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // apply方法来使用中间件，forRoutes方法来指定中间件的路由
    // forRoutes方法可以传入一个字符串、传入一个对象、传入一个控制器
    /* consumer.apply(Logger).forRoutes('user'); */
    /* consumer
      .apply(Logger)
      .forRoutes({ path: 'user', method: RequestMethod.GET }); */
    consumer.apply(Logger).forRoutes(UserController);
  }
}
