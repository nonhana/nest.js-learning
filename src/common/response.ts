import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Data<T> {
  data: T;
}

/**
 * 定义一个响应拦截器来约束返回的类型
 * - NestInterceptor是一个接口，代表一个Nest.js中的拦截器。
 * - CallHandler是一个接口，代表一个可调用的处理程序。它会接收从上一个中间件传递下来的数据流。
 * - ExecutionContext是一个接口，代表一个执行上下文，它会包含当前请求的一些信息。
 * - Observable是rxjs中的一个类，代表一个可观察的对象，用来处理数据流。
 */
@Injectable()
export class CommonResponse<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    // 这里的next.handle()返回的是一个Observable对象，我们可以通过pipe方法来对数据进行处理。
    return next.handle().pipe(
      // 这里的data就是我们在controller中返回的数据
      map((data) => ({
        data,
        status: 200,
        message: '成功',
        success: true,
      })),
    );
  }
}
