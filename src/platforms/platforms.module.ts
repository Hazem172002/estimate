import { Module } from '@nestjs/common';
import { ResponseService } from 'src/helper/service/response.service';

@Module({
  providers: [ResponseService],
})
export class PlatformsModule {}
