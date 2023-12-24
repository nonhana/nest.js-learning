import {
  ExecutionContext,
  SetMetadata,
  createParamDecorator,
  // applyDecorators, // applyDecorators可以同时使用多个装饰器
} from '@nestjs/common';
import type { Request } from 'express';

// 自定义装饰器，用于设置元数据
// 传入的参数是一个字符串数组，表示角色，可以传入多个角色
export const Role = (...args: string[]) => SetMetadata('role', args);

// 自定义装饰器，用于获取请求的url
// 传入的参数是一个字符串，表示要获取的url
// ctx是自动注入的，表示执行上下文，并且通过ExecutionContext的switchToHttp方法，获取到请求对象。
export const ReqUrl = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    console.log('==========>', data);
    return req.url;
  },
);
