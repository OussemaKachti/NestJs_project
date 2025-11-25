import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MoteurModule } from './moteur/moteur.module';
import { GenerateurModule } from './generateur/generateur.module';
import { PhareModule } from './phare/phare.module';
import { AudioModule } from './audio/audio.module';
import { VehiculeModule } from './vehicule/vehicule.module';
import { MessagesModule } from './messages/messages.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './messages/message.entity';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'nestjs',
      entities: [User, Message],
      synchronize: true,
    }),
    UsersModule,
    MoteurModule,
    GenerateurModule,
    PhareModule,
    AudioModule,
    VehiculeModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}