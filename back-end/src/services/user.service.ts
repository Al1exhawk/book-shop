import User from 'src/documents/user/db.data';
import { UserDocument } from 'src/documents';
import { hash, genSalt } from 'bcrypt';
import { UserRepository } from 'src/repositories';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserModel, RegistrationModel, CreateUserModel } from 'src/models';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<UserModel[]> {
    const users: UserDocument[] = await this.userRepository.findAll();
    // MAPPING
    const usersModel: UserModel[] = users.map((item: UserDocument) => {
      const { id, userName, role, password, email, confirmPassword } = item;
      const userModel: UserModel = {
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

  async findOne(userId: string): Promise<UserModel> {
    const user: UserDocument = await this.userRepository.findOne(userId);
    const { id, userName, role, password, email, confirmPassword } = user;

    const userModel: UserModel = {
       id,
       userName,
       role,
       password,
       email,
       confirmPassword,
      };

    return userModel;
  }

  async findByName(username: string): Promise<UserModel|null> {
    const user: UserDocument = await this.userRepository.findByName(username);

    if (user) {
      const { id, userName, role, password, email, confirmPassword } = user;

      const userModel: UserModel = {
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

  async create(newuser: CreateUserModel|RegistrationModel): Promise<UserModel> {
    const isUserExesist = await this.findByName(newuser.userName);

    if (isUserExesist) {
      throw new HttpException('User with this name already exist!', HttpStatus.FORBIDDEN);
    }

    const salt = await genSalt(10);
    const user: UserDocument = new User({
      ...newuser,
      password: await hash(newuser.password, salt),
    });

    const createdUser: UserDocument = await this.userRepository.create(user);
    const {id, userName, password, role, email, confirmPassword} = createdUser;
    const createdUserModel: UserModel = {
      id,
      userName,
      password,
      role,
      email,
      confirmPassword,
    };

    return  createdUserModel;
  }

  async delete(userId: string): Promise<UserModel> {
    const deletedUser: UserDocument = await this.userRepository.delete(userId);
    const { id, userName, role, password, email, confirmPassword } = deletedUser;

    const deletedUserModel: UserModel = {
      id,
      userName,
      role,
      password,
      email,
      confirmPassword,
     };

    return deletedUserModel;
  }

  async update(userId: string, user: CreateUserModel): Promise<UserModel> {

    const newUser: UserDocument = new User({
      userName: user.userName,
      role: user.role,
      password: user.password,
      confirmPassword: user.confirmPassword,
      email: user.email,
    });

    const updatedUser: UserDocument = await this.userRepository.update(userId, newUser);
    const { id, userName, role, password, email, confirmPassword } = updatedUser;

    const updatedUserModel: UserModel = {
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
