import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
/* ----------multer插件配置上传图片相关---------- */
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  // 想要引入图片上传的功能，首先需要在.modules.ts文件中引入MulterModule模块
  // 并通过register方法传入相关的配置项。这里我们只需要配置storage属性即可
  imports: [
    MulterModule.register({
      // storage属性指定了图片上传后的存储路径
      // 可以配合使用multer的diskStorage方法来指定图片上传后的存储路径以及图片的文件名
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename: (_, file, cb) => {
          // 将文件名定义成时间戳的形式，避免重复
          const fileName = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return cb(null, fileName);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
