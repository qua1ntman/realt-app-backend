import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { AdEntity } from '../modules/ad.entity';
import { Ad } from './../modules/ad.interface';
import { from, Observable } from 'rxjs';
import { User } from './../../auth/modules/user.interface';

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdEntity)
    private readonly adRepository: Repository<AdEntity>,
  ) {}

  createAd(user: User, ad: Ad): Observable<Ad> {
    ad.author = user;
    return from(this.adRepository.save(ad));
  }

  findAllAds(): Observable<Ad[]> {
    return from(this.adRepository.find());
  }

  findAd(id: number): Observable<Ad> {
    return from(this.adRepository.findOne(id));
  }

  findAds(take = 10, skip = 0): Observable<Ad[]> {
    return from(
      this.adRepository.findAndCount({ take, skip }).then(([ads]) => {
        return <Ad[]>ads;
      }),
    );
  }

  updateAd(id: number, ad: Ad): Observable<UpdateResult> {
    return from(this.adRepository.update(id, ad));
  }

  deleteAd(id: number): Observable<DeleteResult> {
    return from(this.adRepository.delete(id));
  }
}
