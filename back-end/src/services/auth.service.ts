import { Login } from 'src/models/login.model';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JWTpayload } from 'src/models/jwt-payload.model';
import { UserService } from 'src/services/user.service';
import { LoginResponse } from 'src/models/login-response.model';

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

    const user =  await this.usersService.findByName(loginModel.userName);

    const payload: JWTpayload = {
      userName: user.userName,
      role: user.role,
    };

    const accessToken = await this.jwtService.sign(payload);

    const loginResponse: LoginResponse = {
      userName: payload.userName,
      role: payload.role,
      token: accessToken,
    };
    return loginResponse;
  }
}
