import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LoginModel, UserModel, LoginResponse, JWTpayload } from '../models';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService) {
    }

  async validatePayload(payload: JWTpayload): Promise<UserModel|null> {
    const user = await this.userService.findByName(payload.userName);

    return user;
  }

  async login(loginModel: LoginModel): Promise<LoginResponse> {
    const { userName, password } = loginModel;
    const user: UserModel|null =  await this.userService.findByName(userName);

    if (!user) {
      throw  new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const isMath: boolean = await compare(password, user.password);
    if (!isMath) {
      throw  new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
    }

    const payload: JWTpayload = {
      userName: user.userName,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    const loginResponse: LoginResponse = {
      userName: payload.userName,
      role: payload.role,
      token: accessToken,
    };
    return loginResponse;
  }
}
