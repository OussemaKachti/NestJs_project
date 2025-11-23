import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateurRepository {
  generatePower(): string {
    return "Électricité générée";
  }
}
