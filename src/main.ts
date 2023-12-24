import { NestFactory } from '@nestjs/core';
import {
  VersioningType, // 引入VersioningType，用于开启版本控制
  ValidationPipe, // 引入ValidationPipe，用于验证参数。可以配合class-validator和class-transformer使用。
} from '@nestjs/common'; // VersioningType中枚举了四种开启版本控制的Type
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

/* ----------相关的自定义响应拦截器引入---------- */
import { CommonResponse } from './common/response';

/* ----------相关的自定义异常过滤器引入---------- */
import { HttpFilter } from './common/filter';

/* ----------相关的插件引入---------- */
// 1. 引入express-session插件。
import * as session from 'express-session';

/* ----------相关的第三方中间件引入---------- */
import * as cors from 'cors';

/* ----------相关的全局守卫引入---------- */
// import { RoleGuard } from './guard/role/role.guard';

// 全局中间件
// 使用场景：验证白名单
/* const whiteList = ['/list']; */
function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  /* if (whiteList.includes(req.originalUrl)) {
    next();
  } else {
    res.send({
      code: 401,
      msg: '没有权限',
    });
  } */
  next();
}

async function bootstrap() {
  // 在通过create函数创建app实例时，需要指定app的类型为NestExpressApplication。
  // NestExpressApplication提供了express的所有方法，包括useStaticAssets、setViewEngine等。
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 使用express中的useStaticAssets方法来指定静态资源的路径。
  app.useStaticAssets(join(__dirname, 'images'), {
    // 在useStaticAssets方法中可以传递第二个参数，也就是具体的配置项。
    // prefix代表访问静态资源的前缀，这里我们设置为/images/。
    prefix: '/images/',
  });

  // enableVersioning代表开启版本控制
  app.enableVersioning({
    type: VersioningType.URI,
  });
  /* ----------在app中注册上方引入的响应拦截器---------- */
  app.useGlobalInterceptors(new CommonResponse());
  /* ----------在app中注册上方引入的异常过滤器---------- */
  app.useGlobalFilters(new HttpFilter());
  /* ----------在app中注册上方引入的管道---------- */
  app.useGlobalPipes(new ValidationPipe());
  /* ----------在app中注册上方引入的插件---------- */
  // 2. 在app中注册express-session插件
  app.use(
    session({
      secret: 'non_hana', // 用于加密的字符串，可以随便写。主要用于防止cookie被篡改。
      rolling: true, // 每次请求都重新设置session cookie，重置cookie过期时间。主要用于保持用户登录状态。
      name: 'non_hana.sid', // cookie的名称，默认是connect.sid。
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 设置cookie过期时间，毫秒为单位。这里设置为1天。
      },
    }),
  );
  /* ----------在app中引入全局中间件---------- */
  app.use(cors());
  app.use(MiddleWareAll);
  /* ----------在app中注册全局守卫---------- */
  // app.useGlobalGuards(new RoleGuard());
  await app.listen(3000);
}
bootstrap();
