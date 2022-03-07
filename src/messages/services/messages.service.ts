import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { MessageEntity } from './../modules/mesages.entity';
import { from, Observable } from 'rxjs';
import { User } from './../../auth/modules/user.interface';
import { Message } from './../modules/messages.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly adRepository: Repository<MessageEntity>,
  ) {}

  createMessage(user: User, message: Message): Observable<Message> {
    message.author = user;
    return from(this.adRepository.save(message));
  }

  findAllMessages(): Observable<Message[]> {
    return from(this.adRepository.find());
  }

  findMessage(id: number): Observable<Message> {
    return from(this.adRepository.findOne(id));
  }

  findMessages(take = 10, skip = 0): Observable<Message[]> {
    return from(
      this.adRepository.findAndCount({ take, skip }).then(([messages]) => {
        return <Message[]>messages;
      }),
    );
  }

  updateMessage(id: number, message: Message): Observable<UpdateResult> {
    return from(this.adRepository.update(id, message));
  }

  deleteMessage(id: number): Observable<DeleteResult> {
    return from(this.adRepository.delete(id));
  }
}
