import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { PrismaService } from 'src/prisma.service';
import { getImageDto } from './dto/getImage.dto';
import { PlatformsService } from './platforms.service';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), './uploads'));
  },
  filename: (req, file, cb) => {
    let extArray = file.mimetype.split('/');
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + extension);
  },
});

@Controller('platforms')
export class PlatformsController {
  constructor(
    private platformsService: PlatformsService,
    private prisma: PrismaService,
  ) {}
  @Get()
  async getPlatforms(@Res() res) {
    return this.platformsService.getPlatforms(res);
  }

  @Post('Images')
  @UseInterceptors(FileInterceptor('image', { storage }))
  async uploadImage(@UploadedFile() image: Express.Multer.File, @Res() res) {
    return this.platformsService.transform(image, res);
  }

  // @Get('GetImage')
  // async getImage(@Param() Param, @Res() res) {
  //   return res.sendFile();
  // }

  @Patch('/profile')
  async getImage(
    @Req() req: Request,
    @Res() res: Response,
    getImageDto: getImageDto,
  ) {
    return this.platformsService.getImage(req, res, getImageDto);
  }
}
