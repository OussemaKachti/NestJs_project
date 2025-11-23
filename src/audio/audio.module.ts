 import { Module } from '@nestjs/common';
 import { AudioService } from './audio.service';
 import { AudioRepository } from './audio.repository';
 import { AudioController } from './audio.controller';

 @Module({
   controllers: [AudioController],
   providers: [AudioService, AudioRepository],
   exports: [AudioService, AudioRepository],
 })
 export class AudioModule {}
