/* 
  Nest.js异常过滤器的定义流程：
  1. 创建一个类，这个类需要实现ExceptionFilter接口。
  2. 在类中实现catch方法。
  3. 在catch方法中处理异常，包括获取异常信息、获取请求上下文、获取响应对象等。
  4. 在main.ts中使用useGlobalFilters方法来注册全局异常过滤器。
*/
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch()装饰器的作用是将一个普通类标记为异常过滤器，它会将异常过滤器绑定到指定的异常上。
// 比如下面的例子中，我们将HttpException异常绑定到了HttpFilter过滤器上，这样当我们抛出HttpException异常时，就会被HttpFilter过滤器捕获。
@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  // catch方法会在异常被捕获时调用，它接收两个参数，第一个参数是当前的异常对象，第二个参数是当前的请求上下文。
  catch(exception: HttpException, host: ArgumentsHost) {
    // host.switchToHttp()方法会返回一个HttpArgumentsHost对象，它会包含当前请求的一些信息。
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>(); // 拿到请求对象

    const response = ctx.getResponse<Response>(); // 拿到响应对象

    const status = exception.getStatus(); // 拿到异常的状态码

    // 如果接口报错了，就可以把错误信息通过json的形式返回给前端
    response.status(status).json({
      success: false,
      data: exception,
      timestamp: new Date().toISOString(),
      statusCode: status,
      path: request.url,
    });
  }
}
