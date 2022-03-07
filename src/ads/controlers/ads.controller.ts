import {
  Controller,
  UseGuards,
  Post,
  Get,
  Query,
  Put,
  Param,
  Body,
  Delete,
  Request,
  Header,
} from '@nestjs/common';
import { AdsService } from './../service/ads.service';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Ad } from './../modules/ad.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('ads')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() ad: Ad, @Request() req): Observable<Ad> {
    return this.adsService.createAd(req.user, ad);
  }

  @Get()
  findAll(): Observable<Ad[]> {
    return this.adsService.findAllAds();
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<Ad> {
    return this.adsService.findAd(id);
  }

  @Get()
  findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Observable<Ad[]> {
    take = take > 20 ? 20 : take;
    return this.adsService.findAds(take, skip);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() ad: Ad): Observable<UpdateResult> {
    return this.adsService.updateAd(id, ad);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.adsService.deleteAd(id);
  }
}
