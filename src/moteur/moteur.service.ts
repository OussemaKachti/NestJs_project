import { Injectable } from '@nestjs/common';
import { MoteurRepository } from './moteur.repository';

@Injectable()
export class MoteurService {
  constructor(private readonly moteurRepository: MoteurRepository) {}

  startEngine(): string {
    return this.moteurRepository.start();
  }

  getStatus(): string {
    return this.moteurRepository.getStatus();
  }
}
