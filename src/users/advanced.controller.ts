import { Controller, Get, Post, Put, Query, Param, Body, Logger } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users/advanced')
export class AdvancedController {
  private readonly logger = new Logger(AdvancedController.name);

  constructor(private readonly usersService: UsersService) {}

  // ========== ÉTAPE 3.1: Requêtes Complexes de Récupération ==========

  // Exclure certains champs sensibles selon le rôle du demandeur
  @Get('exclude-sensitive')
  async findAllExcludingSensitive(
    @Query('excludeEmail') excludeEmail?: string,
    @Query('excludeRole') excludeRole?: string,
  ) {
    this.logger.log('GET /users/advanced/exclude-sensitive');
    return this.usersService.findAllExcludingSensitiveFields(
      excludeEmail === 'true',
      excludeRole === 'true',
    );
  }

  // Utilisateurs non mis à jour depuis plus de 6 mois
  @Get('not-updated-6months')
  async findNotUpdatedIn6Months() {
    this.logger.log('GET /users/advanced/not-updated-6months');
    return this.usersService.findUsersNotUpdatedIn6Months();
  }

  // Utilisateurs par domaine d'email
  @Get('domain/:domain')
  async findByEmailDomain(@Param('domain') domain: string) {
    this.logger.log(`GET /users/advanced/domain/${domain}`);
    return this.usersService.findByEmailDomain(domain);
  }

  // Utilisateurs créés dans les 7 derniers jours
  @Get('created-last-7days')
  async findCreatedLast7Days() {
    this.logger.log('GET /users/advanced/created-last-7days');
    return this.usersService.findUsersCreatedLast7Days();
  }

  // ========== ÉTAPE 3.2: Requêtes Basées sur les Statistiques ==========

  // Compter les utilisateurs par rôle
  @Get('stats/count-by-role')
  async countByRole() {
    this.logger.log('GET /users/advanced/stats/count-by-role');
    return this.usersService.countUsersByRole();
  }

  // Utilisateurs créés entre deux dates
  @Get('stats/between-dates')
  async findBetweenDates(
    @Query('date1') date1: string,
    @Query('date2') date2: string,
  ) {
    this.logger.log(`GET /users/advanced/stats/between-dates`);
    return this.usersService.findUsersBetweenDates(new Date(date1), new Date(date2));
  }

  // Utilisateurs les plus récents
  @Get('stats/most-recent')
  async findMostRecent(@Query('limit') limit?: string) {
    this.logger.log('GET /users/advanced/stats/most-recent');
    return this.usersService.findMostRecentUsers(limit ? parseInt(limit, 10) : 10);
  }

  // Moyenne des jours entre création et mise à jour
  @Get('stats/avg-days-between')
  async getAverageDays() {
    this.logger.log('GET /users/advanced/stats/avg-days-between');
    const avg = await this.usersService.getAverageDaysBetweenCreationAndUpdate();
    return { averageDays: avg };
  }

  // ========== ÉTAPE 3.3: Pagination et Tri ==========

  // Pagination
  @Get('paginated')
  async findPaginated(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    this.logger.log('GET /users/advanced/paginated');
    return this.usersService.findPaginated(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  // Tri par createdAt DESC
  @Get('sorted/created-desc')
  async findAllSortedByCreatedAtDesc() {
    this.logger.log('GET /users/advanced/sorted/created-desc');
    return this.usersService.findAllSortedByCreatedAtDesc();
  }

  // Tri par plusieurs critères (role puis createdAt)
  @Get('sorted/multi-criteria')
  async findAllSortedByMultipleCriteria() {
    this.logger.log('GET /users/advanced/sorted/multi-criteria');
    return this.usersService.findAllSortedByMultipleCriteria();
  }

  // ========== ÉTAPE 3.4: Manipulation des Données ==========

  // Créer un utilisateur avec vérification de doublon
  @Post('create-with-check')
  async createUserWithCheck(@Body() data: { email: string; role?: string }) {
    this.logger.log('POST /users/advanced/create-with-check');
    return this.usersService.createUserWithDuplicateCheck(data.email, data.role || 'client');
  }

  // Mettre à jour avec journalisation
  @Put(':id/update-with-logging')
  async updateWithLogging(
    @Param('id') id: string,
    @Body() data: Partial<{ email: string; role: string; active: boolean }>,
  ) {
    this.logger.log(`PUT /users/advanced/${id}/update-with-logging`);
    return this.usersService.updateUserWithLogging(id, data);
  }

  // Désactiver les comptes inactifs depuis plus d'un an
  @Put('disable-inactive-year')
  async disableInactiveOverYear() {
    this.logger.log('PUT /users/advanced/disable-inactive-year');
    return this.usersService.disableInactiveAccountsOverOneYear();
  }

  // Mise à jour en masse du rôle par domaine
  @Put('bulk-update-role-by-domain')
  async bulkUpdateRoleByDomain(
    @Body() data: { domain: string; newRole: string },
  ) {
    this.logger.log('PUT /users/advanced/bulk-update-role-by-domain');
    return this.usersService.bulkUpdateRoleByEmailDomain(data.domain, data.newRole);
  }
}

