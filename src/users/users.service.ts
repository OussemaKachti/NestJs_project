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
}