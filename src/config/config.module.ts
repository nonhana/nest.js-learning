import { Module, Global } from '@nestjs/common';
import type { DynamicModule } from '@nestjs/common/interfaces';

interface Options {
  path: string;
}

// 使用@Global()装饰器，可以将模块设置为全局作用域
// 这样就可以在任何地方使用ConfigModule中的服务了
@Global()
@Module({
  /* providers: [
    {
      provide: 'CONFIG',
      useValue: {
        baseUrl: 'http://localhost:3000',
      },
    },
  ],
  exports: ['CONFIG'], // 导出服务 */
})

// 使用静态方法改成动态模块，主要作用是可以给module传递参数
export class ConfigModule {
  // 静态方法，可以在其他模块中使用forRoot方法导入
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG',
          useValue: {
            baseUrl: 'http://localhost:3000' + options.path,
          },
        },
      ],
      exports: ['CONFIG'], // 导出服务
    };
  }
}
