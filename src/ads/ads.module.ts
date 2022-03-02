import { Module } from '@nestjs/common';
import { AdsController } from './controlers/ads.controller';
import { AdsService } from './service/ads.service';

@Module({
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
