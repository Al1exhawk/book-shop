import { User } from 'src/models/user.model';
import { CreateUser } from 'src/models/create-user.model';
import { Injectable } from '@nestjs/common';
import { hash, genSalt } from 'bcrypt';
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

  async create(newuser: CreateUser): Promise<User> {
    const { userName, password, confirmPassword, role, email} = newuser;
    const salt = await genSalt(10);

    const user: CreateUser = {
      userName,
      password: await hash(password, salt),
      confirmPassword,
      role,
      email,
    };
    const newUser = this.userRepository.create(user);

    return  newUser;
  }

  async delete(id: string): Promise<User> {
    const deletedUser = this.userRepository.delete(id);

    return deletedUser;
  }

  async update(id: string, user: CreateUser): Promise<User> {
    const updatedUser = this.userRepository.update(id, user);

    return updatedUser;
  }
}
