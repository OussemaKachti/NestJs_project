import { Controller, Post } from '@nestjs/common';
import { GenerateurService } from './generateur.service';

@Controller('generateur')
export class GenerateurController {
  constructor(private readonly generateurService: GenerateurService) {}

  @Post('generate')
  generate() {
    return this.generateurService.generateElectricity();
  }
}
