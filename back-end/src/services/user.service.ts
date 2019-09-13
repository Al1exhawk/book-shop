import { User } from 'src/models';
import { Injectable } from '@nestjs/common';
import { UserDocument } from 'src/documents';
import { hash, genSalt } from 'bcrypt';
import { UserRepository } from 'src/repositories';
import { CreateUserModel } from 'src/models';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users: UserDocument[] = await this.userRepository.findAll();
    const usersmodel: User[] = users.map((item: UserDocument) => {
      const { id, userName, role, password, email, confirmPassword } = item;

      const userModel: User = {
        id,
        userName,
        role,
        password,
        email,
        confirmPassword,
      };

      return userModel;
    });

    return usersmodel;
  }

  async findOne(userId: string): Promise<User> {
    const user: UserDocument = await this.userRepository.findOne(userId);
    const { id, userName, role, password, email, confirmPassword } = user;

    const userModel: User = {
       id,
       userName,
       role,
       password,
       email,
       confirmPassword,
      };

    return userModel;
  }

  async findByName(username: string): Promise<User|null> {
    const user: UserDocument = await this.userRepository.findByName(username);
    if (user) {
      const { id, userName, role, password, email, confirmPassword } = user;

      const userModel: User = {
        id,
        userName,
        role,
        password,
        email,
        confirmPassword,
      };
      return userModel;
    }
    return null;
  }

  async create(newuser: CreateUserModel): Promise<User> {
    const { userName, password, confirmPassword, role, email} = newuser;
    const salt = await genSalt(10);

    const user: CreateUserModel = {
      userName,
      password: await hash(password, salt),
      confirmPassword,
      role,
      email,
    };

    const newUser: UserDocument = await this.userRepository.create(user);

    const newUserModel: User = {
      id: newUser.id,
      userName: newUser.userName,
      password: newUser.password,
      role: newUser.role,
      email: newUser.email,
    };

    return  newUserModel;
  }

  async delete(userId: string): Promise<User> {
    const deletedUser: UserDocument = await this.userRepository.delete(userId);
    const { id, userName, role, password, email, confirmPassword } = deletedUser;

    const deletedUserModel: User = {
      id,
      userName,
      role,
      password,
      email,
      confirmPassword,
     };

    return deletedUserModel;
  }

  async update(userId: string, user: CreateUserModel): Promise<User> {
    const updatedUser: UserDocument = await this.userRepository.update(userId, user);
    const { id, userName, role, password, email, confirmPassword } = updatedUser;

    const updatedUserModel: User = {
      id,
      userName,
      role,
      password,
      email,
      confirmPassword,
     };

    return updatedUserModel;
  }
}
