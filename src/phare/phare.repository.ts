import { Injectable } from '@nestjs/common';

@Injectable()
export class PhareRepository {
  turnOn(): string {
    return 'Phares allumés';
  }
}
