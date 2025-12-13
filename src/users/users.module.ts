import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { AdminController } from './admin.controller';
import { ClientController } from './client.controller';
import { AdvancedController } from './advanced.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, AdminController, ClientController, AdvancedController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

