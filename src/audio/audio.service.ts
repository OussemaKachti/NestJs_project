import { Injectable } from '@nestjs/common';
import { AudioRepository } from './audio.repository';
import { GenerateurService } from '../generateur/generateur.service';

@Injectable()
export class AudioService {
  constructor(
    private readonly audioRepository: AudioRepository,
    private readonly generateurService: GenerateurService,
  ) {}

  play(): string {
    const power = this.generateurService.generateElectricity();
    const music = this.audioRepository.playMusic();
    return `${music} avec ${power}`;
  }
}
