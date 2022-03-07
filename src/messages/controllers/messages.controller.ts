import { Controller, Get, UseGuards, Post, Body, Request, Param, Query, Delete, Put } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Message } from './../modules/messages.interface';
import { MessagesService } from './../services/messages.service';
import { Observable } from 'rxjs';
import { UpdateResult, DeleteResult } from 'typeorm';

@Controller('messages')
export class MessagesController {
  constructor(private adsService: MessagesService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() message: Message, @Request() req): Observable<Message> {
    return this.adsService.createMessage(req.user, message);
  }

  @Get()
  findAll(): Observable<Message[]> {
    return this.adsService.findAllMessages();
  }

  @Get(':id')
  find(@Param('id') id: number): Observable<Message> {
    return this.adsService.findMessage(id);
  }

  @Get()
  findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Observable<Message[]> {
    take = take > 20 ? 20 : take;
    return this.adsService.findMessages(take, skip);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() feedPost: Message,
  ): Observable<UpdateResult> {
    return this.adsService.updateMessage(id, feedPost);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.adsService.deleteMessage(id);
  }
}
