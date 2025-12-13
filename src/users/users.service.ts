import { Injectable, NotFoundException, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { User } from './user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: MongoRepository<User>,
  ) {}

  async create(email: string, password: string): Promise<User> {
    try {
      this.logger.log(`Creating new user with email: ${email}`);
      const user = this.usersRepository.create({
        email,
        password,
        active: false,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new BadRequestException('Failed to create user: ' + error.message);
    }
  }

  findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    return this.usersRepository.find();
  }

  async findOneById(id: string): Promise<User> {
    this.logger.log(`Searching for user with ID: ${id}`);
    const user = await this.usersRepository.findOneBy({
      _id: new ObjectId(id),
    } as any);
    
    if (!user) {
      this.logger.warn(`User with ID: ${id} not found`);
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    this.logger.log(`Searching for user with email: ${email}`);
    const user = await this.usersRepository.findOneBy({ email } as any);
    
    if (!user) {
      this.logger.warn(`User with email: ${email} not found`);
      throw new NotFoundException('User not found');
    }
    return user;
  }

  findActive(): Promise<User[]> {
    this.logger.log('Fetching all active users');
    return this.usersRepository.find({ 
      where: { active: true } as any 
    });
  }

  async update(id: string, data: any): Promise<User> {
    try {
      this.logger.log(`Updating user with ID: ${id}`);
      const user = await this.findOneById(id);
      Object.assign(user, data);
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to update user: ${error.message}`);
      throw new BadRequestException('Failed to update user: ' + error.message);
    }
  }

  async remove(id: string): Promise<void> {
    this.logger.log(`Removing user with ID: ${id}`);
    const user = await this.findOneById(id);
    await this.usersRepository.delete({ _id: new ObjectId(id) } as any);
    this.logger.log(`User with ID: ${id} removed successfully`);
  }

  async activate(id: string, password: string): Promise<User> {
    this.logger.log(`Attempting to activate user with ID: ${id}`);
    const user = await this.findOneById(id);
    
    if (user.password !== password) {
      this.logger.warn(`Invalid password attempt for user ID: ${id}`);
      throw new UnauthorizedException('Invalid password');
    }
    
    user.active = true;
    const activatedUser = await this.usersRepository.save(user);
    this.logger.log(`User with ID: ${id} activated successfully`);
    return activatedUser;
  }

  // ========== ÉTAPE 3.1: Requêtes Complexes de Récupération ==========

  // 1. Récupérer les utilisateurs en excluant email et role selon le rôle du demandeur
  async findAllExcludingSensitiveFields(excludeEmail: boolean = false, excludeRole: boolean = false): Promise<any[]> {
    this.logger.log('Fetching users excluding sensitive fields');
    const users = await this.usersRepository.find();
    return users.map(user => {
      const userObj = { ...user };
      if (excludeEmail) delete userObj.email;
      if (excludeRole) delete userObj.role;
      return userObj;
    });
  }

  // 2. Récupérer les utilisateurs qui n'ont pas été mis à jour depuis plus de 6 mois
  async findUsersNotUpdatedIn6Months(): Promise<User[]> {
    this.logger.log('Fetching users not updated in last 6 months');
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    return this.usersRepository.find({
      where: {
        updatedAt: { $lt: sixMonthsAgo } as any,
      } as any,
    });
  }

  // 3. Récupérer les utilisateurs dont l'email appartient à un domaine spécifique
  async findByEmailDomain(domain: string): Promise<User[]> {
    this.logger.log(`Fetching users with email domain: ${domain}`);
    return this.usersRepository.find({
      where: {
        email: { $regex: `@${domain}$` } as any,
      } as any,
    });
  }

  // 4. Récupérer les utilisateurs créés durant les 7 derniers jours
  async findUsersCreatedLast7Days(): Promise<User[]> {
    this.logger.log('Fetching users created in last 7 days');
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return this.usersRepository.find({
      where: {
        createdAt: { $gte: sevenDaysAgo } as any,
      } as any,
    });
  }

  // ========== ÉTAPE 3.2: Requêtes Basées sur les Statistiques ==========

  // 1. Compter le nombre d'utilisateurs pour chaque rôle (group by role)
  async countUsersByRole(): Promise<any> {
    this.logger.log('Counting users by role');
    const users = await this.usersRepository.find();
    const countByRole = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return countByRole;
  }

  // 2. Récupérer les utilisateurs créés entre deux dates spécifiques
  async findUsersBetweenDates(date1: Date, date2: Date): Promise<User[]> {
    this.logger.log(`Fetching users between ${date1} and ${date2}`);
    const startDate = date1 < date2 ? date1 : date2;
    const endDate = date1 > date2 ? date1 : date2;
    
    return this.usersRepository.find({
      where: {
        createdAt: {
          $gte: startDate,
          $lte: endDate,
        } as any,
      } as any,
    });
  }

  // 3. Récupérer les utilisateurs les plus récents par createdAt
  async findMostRecentUsers(limit: number = 10): Promise<User[]> {
    this.logger.log(`Fetching ${limit} most recent users`);
    return this.usersRepository.find({
      order: {
        createdAt: 'DESC',
      } as any,
      take: limit,
    });
  }

  // 4. Obtenir la moyenne du nombre de jours entre création et dernière mise à jour
  async getAverageDaysBetweenCreationAndUpdate(): Promise<number> {
    this.logger.log('Calculating average days between creation and update');
    const users = await this.usersRepository.find();
    
    if (users.length === 0) return 0;
    
    const totalDays = users.reduce((sum, user) => {
      if (user.createdAt && user.updatedAt) {
        const diffTime = Math.abs(user.updatedAt.getTime() - user.createdAt.getTime());
        const diffDays = diffTime / (1000 * 60 * 60 * 24);
        return sum + diffDays;
      }
      return sum;
    }, 0);
    
    return totalDays / users.length;
  }

  // ========== ÉTAPE 3.3: Pagination et Tri ==========

  // 1. Retourner les utilisateurs de manière paginée
  async findPaginated(page: number = 1, limit: number = 10): Promise<{ data: User[]; total: number; page: number; limit: number }> {
    this.logger.log(`Fetching paginated users - page: ${page}, limit: ${limit}`);
    const skip = (page - 1) * limit;
    
    const [data, total] = await this.usersRepository.findAndCount({
      skip,
      take: limit,
    });
    
    return {
      data,
      total,
      page,
      limit,
    };
  }

  // 2. Trier les utilisateurs par createdAt dans un ordre décroissant
  async findAllSortedByCreatedAtDesc(): Promise<User[]> {
    this.logger.log('Fetching users sorted by createdAt DESC');
    return this.usersRepository.find({
      order: {
        createdAt: 'DESC',
      } as any,
    });
  }

  // 3. Trier par plusieurs critères (role puis createdAt)
  async findAllSortedByMultipleCriteria(): Promise<User[]> {
    this.logger.log('Fetching users sorted by role and createdAt');
    return this.usersRepository.find({
      order: {
        role: 'ASC',
        createdAt: 'DESC',
      } as any,
    });
  }

  // ========== ÉTAPE 3.4: Manipulation des Données ==========

  // 1. Ajouter un nouvel utilisateur avec vérification de doublon d'email
  async createUserWithDuplicateCheck(email: string, role: string = 'client'): Promise<User> {
    this.logger.log(`Creating user with email: ${email} (with duplicate check)`);
    
    const existingUser = await this.usersRepository.findOneBy({ email } as any);
    if (existingUser) {
      this.logger.warn(`User with email ${email} already exists`);
      throw new BadRequestException('User with this email already exists');
    }
    
    const user = this.usersRepository.create({
      email,
      role,
      active: false,
    });
    
    return await this.usersRepository.save(user);
  }

  // 2. Mettre à jour un utilisateur avec journalisation des modifications
  async updateUserWithLogging(id: string, data: Partial<User>): Promise<{ user: User; changes: any }> {
    this.logger.log(`Updating user with ID: ${id} with logging`);
    const user = await this.findOneById(id);
    
    const changes: any = {};
    Object.keys(data).forEach(key => {
      if (user[key] !== data[key]) {
        changes[key] = {
          old: user[key],
          new: data[key],
        };
      }
    });
    
    Object.assign(user, data);
    const updatedUser = await this.usersRepository.save(user);
    
    this.logger.log(`User ${id} updated. Changes: ${JSON.stringify(changes)}`);
    
    return {
      user: updatedUser,
      changes,
    };
  }

  // 3. Désactiver les comptes inactifs depuis plus d'un an
  async disableInactiveAccountsOverOneYear(): Promise<{ count: number; users: User[] }> {
    this.logger.log('Disabling inactive accounts over one year');
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const inactiveUsers = await this.usersRepository.find({
      where: {
        updatedAt: { $lt: oneYearAgo } as any,
        active: true,
      } as any,
    });
    
    const updatedUsers = [];
    for (const user of inactiveUsers) {
      user.active = false;
      updatedUsers.push(await this.usersRepository.save(user));
    }
    
    this.logger.log(`Disabled ${updatedUsers.length} inactive accounts`);
    return {
      count: updatedUsers.length,
      users: updatedUsers,
    };
  }

  // 4. Mettre à jour en masse le rôle des utilisateurs d'un domaine d'email spécifique
  async bulkUpdateRoleByEmailDomain(domain: string, newRole: string): Promise<{ count: number; users: User[] }> {
    this.logger.log(`Bulk updating role to ${newRole} for users with domain ${domain}`);
    
    const users = await this.findByEmailDomain(domain);
    
    const updatedUsers = [];
    for (const user of users) {
      user.role = newRole;
      updatedUsers.push(await this.usersRepository.save(user));
    }
    
    this.logger.log(`Updated role for ${updatedUsers.length} users`);
    return {
      count: updatedUsers.length,
      users: updatedUsers,
    };
  }
}