 import { Module } from '@nestjs/common';
 import { Global } from '@nestjs/common';
 import { MoteurModule } from '../moteur/moteur.module';
 import { GenerateurService } from './generateur.service';
 import { GenerateurRepository } from './generateur.repository';
 import { GenerateurController } from './generateur.controller';

 @Global()
 @Module({
   imports: [MoteurModule],
   controllers: [GenerateurController],
   providers: [GenerateurService, GenerateurRepository],
   exports: [GenerateurService, GenerateurRepository],
 })
 export class GenerateurModule {}
