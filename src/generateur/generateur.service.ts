import { Injectable } from '@nestjs/common';
import { GenerateurRepository } from './generateur.repository';
import { MoteurService } from '../moteur/moteur.service';

@Injectable()
export class GenerateurService {
  constructor(
    private readonly generateurRepository: GenerateurRepository,
    private readonly moteurService: MoteurService,
  ) {}

  generateElectricity(): string {
    this.moteurService.startEngine();
    const power = this.generateurRepository.generatePower();
    return `${power} grâce au moteur`;
  }
}
