import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { RoleBasedFieldsInterceptor } from './interceptors/role-based-fields.interceptor';

@Controller('admin/users')
@UseInterceptors(RoleBasedFieldsInterceptor) // Appliquer l'intercepteur au niveau du contrôleur
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    // Cette méthode retourne la liste complète des utilisateurs
    // L'intercepteur filtrera les champs selon le rôle (admin = tous les champs)
    return this.usersService.findAll();
  }
}

