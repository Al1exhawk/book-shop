import User from '../documents/user/db.data';
import { UserDocument } from '../documents';
import { hash, genSalt } from 'bcrypt';
import { UserRepository } from '../repositories';
import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  forwardRef,
} from '@nestjs/common';
import {
  UserModel,
  RegistrationModel,
  CreateUserModel,
  FilterModel,
  UpdateUserModel,
} from '../models';
import { ConfigService } from './config.service';
import { send, setApiKey } from '@sendgrid/mail';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    setApiKey(this.configService.SEND_GRID_API);
  }

  async findAll(page: number, usersPerPage: number): Promise<FilterModel> {
    const reposirotyResponse = await this.userRepository.findAll(
      page,
      usersPerPage,
    );

    const usersModel: UserModel[] = reposirotyResponse.users.map(
      (item: UserDocument) => {
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
      },
    );

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

  async findByName(username: string): Promise<UserModel | null> {
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

  async create(
    newUser: CreateUserModel | RegistrationModel,
  ): Promise<UserModel> {
    const isUserExesist = await this.findByName(newUser.userName);

    if (isUserExesist) {
      throw new HttpException(
        'User with this name already exist!',
        HttpStatus.FORBIDDEN,
      );
    }

    const salt = await genSalt(10);
    const user: UserDocument = new User({
      ...newUser,
      password: await hash(newUser.password, salt),
    });

    const createdUser: UserDocument = await this.userRepository.create(user);
    const {
      id,
      userName,
      password,
      role,
      email,
      confirmPassword,
    } = createdUser;
    const createdUserModel: UserModel = {
      id,
      userName,
      password,
      role,
      email,
      confirmPassword,
    };

    this.sendmail(createdUserModel.userName, createdUserModel.confirmPassword);

    return createdUserModel;
  }

  async delete(userId: string): Promise<UserModel> {
    const deletedUser: UserDocument = await this.userRepository.delete(userId);
    const {
      id,
      userName,
      role,
      password,
      email,
      confirmPassword,
    } = deletedUser;

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

  async update(userId: string, newUser: UpdateUserModel): Promise<UserModel> {
    const salt = await genSalt(10);
    const updUser: UpdateUserModel = {
      ...newUser,
      password: await hash(newUser.password, salt),
    };

    const updatedUser: UserDocument = await this.userRepository.update(
      userId,
      updUser,
    );
    const {
      id,
      userName,
      role,
      password,
      email,
      confirmPassword,
    } = updatedUser;

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

  async sendmail(userName: string, confirmPassword: boolean) {
    if (confirmPassword === false) {
      const mailToken = sign({ userName }, this.configService.MAIL_JWT_SECRET);
      const msg = {
        to: 'aldevid9@gmail.com',
        from: 'aldevid9@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<a href="http://localhost:3000/confirm/${mailToken}">Please, confirm your password</a>`,
      };
      const res = await send(msg);
      return res;
    }
  }

  async confirm(token: string) {
    const userName: any = verify(token, this.configService.MAIL_JWT_SECRET, {
      ignoreExpiration: true,
    });
    const user = this.userRepository.findByNameAndConfirm(userName.userName);
    return user;
  }
}
