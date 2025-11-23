import { Injectable } from '@nestjs/common';
import { PhareRepository } from './phare.repository';
import { GenerateurService } from '../generateur/generateur.service';

@Injectable()
export class PhareService {
  constructor(
    private readonly phareRepository: PhareRepository,
    private readonly generateurService: GenerateurService,
  ) {}

  turnOnLights(): string {
    const power = this.generateurService.generateElectricity();
    const lights = this.phareRepository.turnOn();
    return `${lights} avec ${power}`;
  }
}
