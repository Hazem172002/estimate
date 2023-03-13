import { Controller, Get, Res } from '@nestjs/common';
import { PlatformsService } from './platforms.service';

@Controller('platforms')
export class PlatformsController {
  constructor(private platformsService: PlatformsService) {}
  @Get()
  async getPlatforms(@Res() res) {
    return this.platformsService.getPlatforms(res);
  }
}
