import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
/* ----------引入文件、目录压缩、解压缩工具包compressing---------- */
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('img')
  /* 
    首先需要了解，当涉及到上传文件相关的接口时，需要把上传的文件给拦截。
    我们需要使用@UseInterceptors装饰器来引入FileInterceptor拦截器。
    @UseInterceptors()装饰器的参数是一个拦截器类，这里我们传入了FileInterceptor拦截器类，
    并且指定了拦截器的第一个参数名称为file，这个参数就是我们上传的文件。
    这样我们就可以在imgUpload方法中通过@UploadedFile()装饰器来获取到上传的文件了。
  */
  @UseInterceptors(FileInterceptor('file'))
  imgUpload(@UploadedFile() file: any) {
    console.log(file);
    return {
      code: 200,
      msg: '图片上传成功',
    };
  }

  @Get('export')
  // 1. 下载图片(整体下载)
  // 这种下载方式最为简单，适合小到中等大小的文件，实现简单，但不适合大型文件，可能会增加服务器内存负担。
  download(@Res() res: Response) {
    const url = join(__dirname, '../images/1702622651587.jpg');
    // 直接使用res的download方法，传入图片的路径即可进行下载
    res.download(url);
  }

  @Get('stream')
  // 2. 下载图片(流式下载)(二进制流)(借助compressing)
  // 流式下载比较适合大文件或需要实时处理的场景，更有效地管理内存，但实现相对复杂。
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1702622651587.jpg');
    const tarStream = new zip.Stream(); // 使用compressing中的zip的Stream方法创建一个流
    await tarStream.addEntry(url); // 将图片文件添加到流中

    res.setHeader('Content-Type', 'application/octet-stream'); // 设置响应头为二进制流

    res.setHeader('Content-Disposition', 'attachment; filename=黑希儿'); // 设置响应头为附件形式下载

    tarStream.pipe(res); // 将流导入到res中并进行下载
  }
}
