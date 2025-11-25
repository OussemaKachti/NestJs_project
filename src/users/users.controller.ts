import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Logger } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  // 1. POST /users - Créer un utilisateur
  @Post()
  async create(@Body() data: { email: string; password: string }) {
    this.logger.log(`POST /users - Creating user with email: ${data.email}`);
    return this.usersService.create(data.email, data.password);
  }

  // 2. PUT /users/activate - Activer un utilisateur
  @Put('activate')
  async activate(@Body() data: { id: string; password: string }) {
    this.logger.log(`PUT /users/activate - Activating user ID: ${data.id}`);
    return this.usersService.activate(data.id, data.password);
  }

  // Alternative: POST /users/:id/activate
  @Post(':id/activate')
  async activateById(@Param('id') id: string, @Body('password') password: string) {
    this.logger.log(`POST /users/${id}/activate - Activating user`);
    return this.usersService.activate(id, password);
  }

  // Récupérer tous les utilisateurs
  @Get()
  findAll() {
    this.logger.log('GET /users - Fetching all users');
    return this.usersService.findAll();
  }

  // 5. GET /users/active - Récupérer les utilisateurs actifs
  @Get('active')
  findActive() {
    this.logger.log('GET /users/active - Fetching active users');
    return this.usersService.findActive();
  }

  // 4. GET /users/email/:email - Obtenir un utilisateur par email
  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    this.logger.log(`GET /users/email/${email} - Fetching user by email`);
    return this.usersService.findOneByEmail(email);
  }

  // 3. GET /users/:id - Obtenir un utilisateur par ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`GET /users/${id} - Fetching user by ID`);
    return this.usersService.findOneById(id);
  }

  // Mettre à jour un utilisateur
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: any) {
    this.logger.log(`PATCH /users/${id} - Updating user`);
    return this.usersService.update(id, data);
  }

  // Supprimer un utilisateur
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`DELETE /users/${id} - Removing user`);
    return this.usersService.remove(id);
  }
}