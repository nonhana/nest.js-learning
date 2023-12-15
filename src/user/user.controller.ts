import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import * as svgCaptcha from 'svg-captcha';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET请求
  @Get()
  @HttpCode(200) // 使用@HttpCode()装饰器设置响应状态码
  // 1. 可以使用@Request()来获取请求对象
  /* findAll(@Request() req: any) {
    console.log(req.query);
    return {
      code: 200,
      message: req.query.name,
    };
  } */
  // 2. 也可以使用@Query()来获取请求对象的query参数
  // @Query()内部可以传参。
  // @Query('name') name: string，就是只获取请求对象的query参数中的name属性
  findAll(
    // @Query() query: any
    @Query('name') name: string,
  ) {
    // console.log(query);
    console.log(name);
    return {
      code: 200,
      // message: query.name,
      message: name,
    };
  }

  // POST请求
  @Post()
  // 1. 可以使用@Request()来获取请求对象
  /* create(@Request() req: any) {
    console.log(req.body);
    return {
      code: 200,
      message: req.body.name,
    };
  } */
  // 2. 也可以使用@Body()来获取请求对象的body参数
  // @Body()内部可以传参。
  // @Body('name') name: string，就是只获取请求对象的body参数中的name属性
  // @Body('age') age: number，就是只获取请求对象的body参数中的age属性
  create(
    // @Body() body: any
    // @Body('name') name: string,
    @Body('age') age: number,
  ) {
    // console.log(body);
    // console.log(name);
    console.log(age);
    return {
      code: 200,
      // message: body.name,
      // message: body,
      message: age,
    };
  }

  // 动态路由参数
  @Get(':id')
  // 1. 可以使用@Request()来获取请求对象
  /* findId(@Request() req: any) {
    console.log(req.params);
    return {
      code: 200,
      message: req.params.id,
    };
  } */
  // 2. 也可以使用@Param()来获取请求对象的params参数
  // @Param()内部可以传参。
  // @Param('id') id: string，就是只获取请求对象的params参数中的id属性
  /* findId(
    // @Param() params: any
    @Param('id') id: string,
    @Headers() headers: any, // 可以通过@Headers()装饰器获取请求头信息
  ) {
    // console.log(params);
    console.log(id);
    console.log(headers);
    return {
      code: 200,
      // message: params.id,
      message: id,
    };
  } */

  // 生成验证码图片
  @Get('captcha')
  createCaptcha(@Req() req: any, @Res() res: any, @Session() session: any) {
    const Captcha = svgCaptcha.create({
      size: 4, // 验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除'0o1i'
      noise: 3, // 干扰线条的数量
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#cc9966', // 验证码图片背景颜色
      width: 150, // 验证码图片宽度
      height: 50, // 验证码图片高度
    });

    // 将验证码保存到session中，方便前端进行验证
    session.code = Captcha.text;
    res.type('image/svg+xml'); // 响应的类型
    res.status(200).send(Captcha.data); // 响应状态码
  }

  // 创建用户
  @Post('create')
  createUser(@Body() body: any, @Session() session: any) {
    console.log(body, session.code);
    // 对cookie中的验证码和用户输入后传过来的验证码作对比
    if (session.code.toLowerCase() === body.code.toLowerCase()) {
      return {
        code: 200,
        message: '注册成功',
      };
    } else {
      return {
        code: 400,
        message: '验证码错误',
      };
    }
  }
}
