import { FileInterceptor } from '@nestjs/platform-express';
import {
  BadRequestException,
  Injectable,
  mixin,
  NestInterceptor,
  Type,
} from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
  fileFilter?: MulterOptions['fileFilter'];
  limits?: MulterOptions['limits'];
}

function LocalFilesInterceptor(
  options: LocalFilesInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      const filesDestination = './uploads';

      const destination = `${filesDestination}${options.path}`;

      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination,
          filename: defaultFileName,
        }),
        fileFilter: options.fileFilter ?? defaultFileFilter,
        limits: options.limits,
      };

      this.fileInterceptor = new (FileInterceptor(
        options.fieldName,
        multerOptions,
      ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export const defaultFileFilter = (request, file, callback) => {
  console.log(file);
  if (!file.mimetype.includes('image')) {
    return callback(new BadRequestException('Provide a valid image'), false);
  }
  callback(null, true);
};

export const defaultFileName = (request, file, callback) => {
  let type = file.mimetype.split('/')[1];
  if (file.mimetype.includes('svg')) {
    type = 'svg';
  }
  const fileName =
    file.originalname.split('.')[0] + '-' + Date.now() + `.${type}`;
  callback(null, fileName);
};

export default LocalFilesInterceptor;
