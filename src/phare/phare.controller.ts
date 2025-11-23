import { Controller, Post } from '@nestjs/common';
import { PhareService } from './phare.service';

@Controller('phare')
export class PhareController {
  constructor(private readonly phareService: PhareService) {}

  @Post('turn-on')
  turnOn() {
    return this.phareService.turnOnLights();
  }
}
