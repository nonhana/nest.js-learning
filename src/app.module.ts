// src/app.module.ts
// 该文件的主要作用是将app.controller.ts和app.service.ts组合起来，形成一个完整的模块。
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service'; // 引入服务
import { AppService2 } from './app.service2'; // 引入服务
import { UserModule } from './user/user.module';
import { ListModule } from './list/list.module';
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { PModule } from './p/p.module';

// Module是一个类装饰器，它将元数据附加到AppModule类。
@Module({
  imports: [
    UserModule,
    ListModule,
    ConfigModule.forRoot({ path: '/non_hana' }),
    UploadModule,
    PModule,
  ], // 导入其他模块
  controllers: [AppController], // 控制器，主要是配置路由
  // 把服务注入到providers中，这样就可以在AppController中使用AppService这个服务
  providers: [
    AppService2, // 不使用对象的形式
    {
      provide: 'MAIN_SERVICE', // 给服务起一个别名
      useClass: AppService, // 服务的具体实现类
    },
    {
      provide: 'TEST', // 给服务起一个别名
      useValue: 'test', // 服务的默认值
    },
    {
      provide: 'FACTORY',
      inject: [AppService2], // 依赖注入，可以作为参数传进useFactory中
      // useFactory是一个工厂方法，它可以返回一个实例化后的服务
      // useFactory的参数是一个函数，函数的参数是inject中的服务
      /* useFactory: (AppService2: AppService2) => {
        console.log(AppService2.getHello());
        return 123;
      }, */
      // 并且支持异步操作
      useFactory: async (AppService2: AppService2) => {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve(AppService2.getHello());
          }, 1000);
        });
      },
    },
  ],
})
export class AppModule {}
