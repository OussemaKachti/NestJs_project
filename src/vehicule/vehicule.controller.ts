import { Controller, Post } from '@nestjs/common';
import { VehiculeService } from './vehicule.service';

@Controller('vehicule')
export class VehiculeController {
  constructor(private readonly vehiculeService: VehiculeService) {}

  @Post('operate')
  operate() {
    return this.vehiculeService.operate();
  }
}
