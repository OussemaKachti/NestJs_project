import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleBasedFieldsInterceptor } from './interceptors/role-based-fields.interceptor';

@Controller('client/users')
@UseInterceptors(RoleBasedFieldsInterceptor) // Appliquer l'intercepteur au niveau du contrôleur
export class ClientController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers() {
    // Cette méthode retourne la liste restreinte des utilisateurs
    // L'intercepteur filtrera les champs selon le rôle (client = seulement id et email)
    return this.usersService.findAll();
  }
}

