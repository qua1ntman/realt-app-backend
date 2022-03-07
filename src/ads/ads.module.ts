import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsController } from './controlers/ads.controller';
import { AdEntity } from './modules/ad.entity';
import { AdsService } from './service/ads.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdEntity])],
  providers: [AdsService],
  controllers: [AdsController],
})
export class AdsModule {}
