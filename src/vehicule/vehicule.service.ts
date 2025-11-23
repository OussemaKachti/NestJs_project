import { Injectable } from '@nestjs/common';
import { VehiculeRepository } from './vehicule.repository';
import { MoteurService } from '../moteur/moteur.service';
import { GenerateurService } from '../generateur/generateur.service';
import { PhareService } from '../phare/phare.service';
import { AudioService } from '../audio/audio.service';

@Injectable()
export class VehiculeService {
  constructor(
    private readonly vehiculeRepository: VehiculeRepository,
    private readonly moteurService: MoteurService,
    private readonly generateurService: GenerateurService,
    private readonly phareService: PhareService,
    private readonly audioService: AudioService,
  ) {}

  operate(): string {
    const moteurStatus = this.moteurService.startEngine();
    const power = this.generateurService.generateElectricity();
    const lights = this.phareService.turnOnLights();
    const music = this.audioService.play();
    const vehicleStatus = this.vehiculeRepository.operate();

    return [moteurStatus, power, lights, music, vehicleStatus].join(' | ');
  }
}
