import { Controller, Get, Post } from '@nestjs/common';
import { MoteurService } from './moteur.service';

@Controller('moteur')
export class MoteurController {
  constructor(private readonly moteurService: MoteurService) {}

  @Post('start')
  start() {
    return this.moteurService.startEngine();
  }

  @Get('status')
  getStatus() {
    return this.moteurService.getStatus();
  }
}
