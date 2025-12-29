import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: MongoRepository<Message>,
  ) {}

  async create(content: string, status: string = 'active'): Promise<Message> {
    const message = this.messagesRepository.create({
      content,
      status,
      date: new Date(),
    });
    return await this.messagesRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messagesRepository.find();
  }
}

