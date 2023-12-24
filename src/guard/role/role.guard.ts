/* 
  NestJS守卫
  - 守卫是NestJS中用于控制器的一种特殊类型的中间件，它可以在执行控制器之前或之后执行一些操作。
  - 守卫的工作方式与中间件类似，但它们的目的不同：
    - 中间件是在请求处理管道中执行的，而守卫是在处理器执行之前或之后执行的。
  - 和NestJS中的拦截器相比，守卫的优势在于它们可以在请求处理管道中的早期执行，这意味着它们可以在控制器处理请求之前执行验证、身份验证或授权逻辑。
*/
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  Reflector, // 引入反射器，用于获取在SetMetadata中设置的元数据
} from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // 在构造函数中注入反射器
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 1. 获取元数据
    // 调用反射器的get方法（可传入泛型），传入role和context.getHandler()，获取元数据。
    // role代表元数据的key，context.getHandler()代表元数据的value。
    const admin = this.reflector.get<string[]>('role', context.getHandler());

    // 2. 获取请求对象
    // 通过ExecutionContext的switchToHttp方法，获取到请求对象。
    const req = context.switchToHttp().getRequest<Request>();
    console.log('经过了守卫', admin, req.query.role);

    // 3. 判断是否有权限，有权限则返回true，没有则返回false
    // 如果返回了false，那么就会抛出一个异常，异常的内容就是ForbiddenException的内容，并且status为403表示无权限。
    if (admin.includes(req.query.role as string)) {
      return true;
    } else {
      return false;
    }
  }
}
