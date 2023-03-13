import { HttpStatus, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService {
  success(@Res() res: Response, message: string, data: object = {}) {
    res.status(HttpStatus.OK).json({ type: 'Success', message, data });
  }
  created(@Res() res: Response, message: string, data: object = {}) {
    res.status(HttpStatus.CREATED).json({ type: 'Created', message, data });
  }
  forbidden(@Res() res: Response, message: string) {
    return res
      .status(HttpStatus.FORBIDDEN)
      .json({ type: 'Forbidden', message });
  }
  conflict(
    @Res() res: Response,
    message: string,
    data: object = {},
    type = 'Conflict',
  ) {
    return res.status(HttpStatus.CONFLICT).json({ type, message, data });
  }
  notFound(@Res() res: Response, message: string) {
    return res.status(HttpStatus.NOT_FOUND).json({ type: 'NotFound', message });
  }
  internalServerError(@Res() res: Response) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      type: 'InternalServerError',
      message:
        'An error occured on the server, Please refer back to the backend development team.',
    });
  }
  unauthorized(@Res() res: Response) {
    res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ type: 'Unauthorized', message: 'Unauthorized' });
  }
  badRequest(@Res() res: Response, type: string, message: string) {
    return res.status(HttpStatus.BAD_REQUEST).json({ type, message });
  }
  custom(
    @Res() res: Response,
    status: number,
    type?: string,
    message?: string,
    data?: object,
  ) {
    return res.status(status).json({ type, message, data });
  }
}
