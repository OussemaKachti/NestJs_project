import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MoteurModule } from './moteur/moteur.module';
import { GenerateurModule } from './generateur/generateur.module';
import { PhareModule } from './phare/phare.module';
import { AudioModule } from './audio/audio.module';
import { VehiculeModule } from './vehicule/vehicule.module';

@Module({
  imports: [
    UsersModule,
    MoteurModule,
    GenerateurModule,
    PhareModule,
    AudioModule,
    VehiculeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}