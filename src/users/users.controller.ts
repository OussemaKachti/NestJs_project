import { Controller, Get, Post, Put, Delete, Param, Body, Query, Headers } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

// Tableau en mémoire pour stocker les utilisateurs
let users = [
  { id: 1, username: 'Mohamed', email: 'mohamed@esprit.tn', status: 'active' },
  { id: 2, username: 'Sarra', email: 'sarra@esprit.tn', status: 'inactive' },
  { id: 3, username: 'Ali', email: 'ali@esprit.tn', status: 'inactive' },
  { id: 4, username: 'Eya', email: 'eya@esprit.tn', status: 'active' },
];

@Controller('users')
export class UsersController {
  @Get()
  getAllUsers(@Query('status') status?: string) {
    if (status) {
      return users.filter(user => user.status === status);
    }
    return users;
  }

  @Get('active/:status')
  getUsersByStatus(@Param('status') status: string) {
    return users.filter(user => user.status === status);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    const user = users.find(u => u.id === userId);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto, @Headers('authorization') auth?: string) {
    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id: newId,
      username: createUserDto.username,
      email: createUserDto.email,
      status: createUserDto.status || 'inactive',
    };
    users.push(newUser);
    return {
      message: 'User created successfully',
      user: newUser,
      authorization: auth || 'No authorization header provided',
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    const userId = parseInt(id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { message: 'User not found' };
    }

    users[userIndex] = {
      ...users[userIndex],
      username: updateUserDto.username,
      email: updateUserDto.email,
      status: updateUserDto.status || users[userIndex].status,
      id: userId, // Garder l'id original
    };

    return {
      message: 'User updated successfully',
      user: users[userIndex],
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const userId = parseInt(id, 10);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return { message: 'User not found' };
    }

    const deletedUser = users.splice(userIndex, 1)[0];
    return {
      message: 'User deleted successfully',
      user: deletedUser,
    };
  }
}

