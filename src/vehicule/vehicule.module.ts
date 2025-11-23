 import { Module } from '@nestjs/common';
 import { VehiculeService } from './vehicule.service';
 import { VehiculeRepository } from './vehicule.repository';
 import { VehiculeController } from './vehicule.controller';
 import { MoteurModule } from '../moteur/moteur.module';
 import { PhareModule } from '../phare/phare.module';
 import { AudioModule } from '../audio/audio.module';

 @Module({
   imports: [MoteurModule, PhareModule, AudioModule],
   controllers: [VehiculeController],
   providers: [VehiculeService, VehiculeRepository],
   exports: [VehiculeService, VehiculeRepository],
 })
 export class VehiculeModule {}
