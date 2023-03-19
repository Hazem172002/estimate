import { UseInterceptors } from '@nestjs/common';
import LocalFilesInterceptor from '../interceptors/multer.interceptor';

export const UploadImage = (fieldName: string, path: string) =>
  UseInterceptors(
    LocalFilesInterceptor({
      fieldName,
      path: `/images/${path}`,
    }),
  );
