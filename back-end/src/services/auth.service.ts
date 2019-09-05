import { Login } from 'src/models/login.model';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWTpayload } from 'src/models/jwt-payload.model';
import { UserService } from 'src/services/user.service';
import { LoginResponse } from 'src/models/login-response.model';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validatePayload(payload: JWTpayload): Promise<any> {
    const user = await this.usersService.findByName(payload.userName);

    return user;
  }

  async login(loginModel: Login): Promise<LoginResponse> {
    const {userName, password} = loginModel;
    const user =  await this.usersService.findByName(userName);

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
