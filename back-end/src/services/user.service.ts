import User from '../documents/user/db.data';
import { UserDocument } from '../documents';
import { hash, genSalt } from 'bcrypt';
import { UserRepository } from '../repositories';
import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { UserModel, RegistrationModel, CreateUserModel, FilterModel } from '../models';
import { AuthService } from './';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService) {}

  async findAll(page: number, usersPerPage: number): Promise<FilterModel> {
    const reposirotyResponse = await this.userRepository.findAll(page, usersPerPage);

    const usersModel: UserModel[] = reposirotyResponse.users.map((item: UserDocument) => {
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

    const userFilterModel: FilterModel = {
      pages: reposirotyResponse.pages,
      content: usersModel,
    };

    return userFilterModel;
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

  async create(newUser: CreateUserModel|RegistrationModel): Promise<UserModel> {
    const isUserExesist = await this.findByName(newUser.userName);

    if (isUserExesist) {
      throw new HttpException('User with this name already exist!', HttpStatus.FORBIDDEN);
    }

    const salt = await genSalt(10);
    const user: UserDocument = new User({
      ...newUser,
      password: await hash(newUser.password, salt),
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

    this.authService.sendmail(createdUserModel.userName, createdUserModel.confirmPassword);

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
