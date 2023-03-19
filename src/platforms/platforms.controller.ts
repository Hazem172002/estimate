import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { UploadImage } from '../common/decorators/multer.decorator';
import { PlatformsService } from './platforms.service';

@Controller('platforms')
export class PlatformsController {
  constructor(private platformsService: PlatformsService) {}
  @Get()
  async getPlatforms(@Res() res) {
    return this.platformsService.getPlatforms(res);
  }

  @Post(':platformId')
  @UploadImage('image', '/platforms')
  async uploadPlatformImage(
    @Res() res,
    @Param('platformId') platformId: string,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.platformsService.uploadImage(res, platformId, image);
  }
}
