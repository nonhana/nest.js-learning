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
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';
/* ----------引入Typeorm模块---------- */
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormModule } from './typeorm/typeorm.module';

// Module是一个类装饰器，它将元数据附加到AppModule类。
@Module({
  imports: [
    UserModule,
    ListModule,
    ConfigModule.forRoot({ path: '/non_hana' }),
    UploadModule,
    PModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    // Typeorm模块
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库地址
      port: 3306, // 端口
      username: 'root', // 用户名
      password: '20021209xiang', // 密码
      database: 'nestjs_demo', // 数据库名称
      // entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体类文件
      synchronize: true, // 这个字段代表每次应用启动时都会使用实体类去更新数据库表结构，生产环境下不建议使用
      retryDelay: 3000, // 重试延时
      retryAttempts: 10, // 重试次数
      autoLoadEntities: true, // 如果为true，则无需再使用entities:[]手动加载实体
    }),
    TypeormModule,
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
