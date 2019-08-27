import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { UserRepository } from 'src/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users = this.userRepository.findAll();

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = this.userRepository.findOne( id );

    return user;
  }

  async findByName(userName: string): Promise<User|null> {
    const user = this.userRepository.findByName(userName);

    return user;
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);

    return  newUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = this.userRepository.delete(id);

    return deletedUser;
  }

  async update(id: string, user: User): Promise<User> {
    const updatedUser = this.userRepository.update(id, user);

    return updatedUser;
  }
}
