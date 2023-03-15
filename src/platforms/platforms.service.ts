import { Injectable, Param } from '@nestjs/common';
import { platform } from 'os';
import * as path from 'path';
import * as sharp from 'sharp';
import { ResponseService } from 'src/helper/service/response.service';
import { PrismaService } from 'src/prisma.service';
import { getImageDto } from './dto/getImage.dto';

@Injectable()
export class PlatformsService {
  constructor(
    private prisma: PrismaService,
    private responseService: ResponseService,
  ) {}
  async getPlatforms(res) {
    const platforms = await this.prisma.platforms.findMany();
    return this.responseService.success(res, 'platforms', platforms);
  }

  async transform(image: Express.Multer.File, res) {
    const platformImg = image.originalname;
    const filename = Date.now() + '-' + platformImg;
    const images = await this.prisma.platforms.findMany({
      select: {
        image: true,
      },
    });
    // console.log(req.file.buffer);
    // await sharp(image.buffer)
    //   .resize(800)
    //   .webp({ effort: 3 })
    //   .toFile(path.join('uploads', filename));

    // return filename;

    return this.responseService.success(res, 'platforms');
  }

  async getImage(req, res, getImageDto) {
    const platforms = await this.prisma.platforms.update({
      data: {
        image: getImageDto.link,
      },
      where: {
        id: req.platform.platforms.id,
      },
    });
    return this.responseService.success(
      res,
      'Image added Successfully',
      platforms,
    );
  }
}
