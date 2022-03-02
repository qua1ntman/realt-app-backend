import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../modules/post.interface';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';
import { JwtGuard } from './../../auth/guards/jwt.guard';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() feedPost: FeedPost, @Request() req): Observable<FeedPost> {
    return this.feedService.createPost(req.user, feedPost);
  }

  @Get()
  findAll(): Observable<FeedPost[]> {
    return this.feedService.findAllPosts();
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<FeedPost> {
    return this.feedService.findPost(id);
  }

  @Get()
  findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Observable<FeedPost[]> {
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: FeedPost,
  ): Observable<UpdateResult> {
    return this.feedService.updatePost(id, feedPost);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
