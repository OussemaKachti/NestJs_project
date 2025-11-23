import { Injectable } from '@nestjs/common';

@Injectable()
export class AudioRepository {
  playMusic(): string {
    return 'Musique en cours de lecture';
  }
}
