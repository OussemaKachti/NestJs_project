 import { Module } from '@nestjs/common';
 import { PhareService } from './phare.service';
 import { PhareRepository } from './phare.repository';
 import { PhareController } from './phare.controller';

 @Module({
   controllers: [PhareController],
   providers: [PhareService, PhareRepository],
   exports: [PhareService, PhareRepository],
 })
 export class PhareModule {}
