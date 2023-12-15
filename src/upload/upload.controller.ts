import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('img')
  // 当涉及到上传文件相关的接口时，需要把上传的文件给拦截。
  // 我们需要使用@UseInterceptors装饰器来引入FileInterceptor拦截器。
  // @UseInterceptors()装饰器的参数是一个拦截器类，
  // 这里我们传入了FileInterceptor拦截器类，
  // 并且指定了拦截器的第一个参数名称为file，这个参数就是我们上传的文件。
  // 这样我们就可以在imgUpload方法中通过@UploadedFile()装饰器来获取到上传的文件了。
  @UseInterceptors(FileInterceptor('file'))
  imgUpload(@UploadedFile() file: any) {
    console.log(file);
    return {
      code: 200,
      msg: '图片上传成功',
    };
  }
}
