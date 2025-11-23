import { Injectable } from '@nestjs/common';

@Injectable()
export class VehiculeRepository {
  operate(): string {
    return 'Véhicule en fonctionnement';
  }
}
