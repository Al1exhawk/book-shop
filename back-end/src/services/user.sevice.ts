import { Injectable } from '@nestjs/common';
import { User } from '../models/user.interface';
import {UserRepository} from '../repositories/user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const Users = this.userRepository.findAll();
    return Users;
  }

  async findOne(id: String): Promise<User> {
    const User = this.userRepository.findOne( id );
    return User;
  }

  async create(User: User): Promise<User> {
    const newUser = this.userRepository.create(User);
    return  newUser;
  }

  async delete(id: String): Promise<User> {
    const deletedUser = this.userRepository.delete(id);
    return deletedUser;
  }

  async update(id: String, User: User): Promise<User> {
    const updatedUser = this.userRepository.update(id, User);
    return updatedUser;
  }
}