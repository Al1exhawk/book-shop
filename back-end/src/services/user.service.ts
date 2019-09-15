import { UserDocument } from 'src/documents';
import { hash, genSalt } from 'bcrypt';
import { UserRepository } from 'src/repositories';
import { CreateUserModel } from 'src/models';
import { User, RegistrationModel } from 'src/models';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    const users: UserDocument[] = await this.userRepository.findAll();
    // MAPPING
    let numberOfModels: number = 0;
    const usersModel: User[] = users.map((item: UserDocument) => {
      const { id, userName, role, password, email, confirmPassword } = item;
      ++numberOfModels;
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

    return usersModel;
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

  async create(newuser: CreateUserModel|RegistrationModel): Promise<User> {
    const isUserExesist = await this.findByName(newuser.userName);

    if (isUserExesist) {
      throw new HttpException('User with this name already exist!', HttpStatus.FORBIDDEN);
    }

    const salt = await genSalt(10);
    const user: CreateUserModel|RegistrationModel = {
      ...newuser,
      password: await hash(newuser.password, salt),
    };

    const newUser: UserDocument = await this.userRepository.create(user);
    const {id, userName, password, role, email, confirmPassword} = newUser;
    const newUserModel: User = {
      id,
      userName,
      password,
      role,
      email,
      confirmPassword,
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
