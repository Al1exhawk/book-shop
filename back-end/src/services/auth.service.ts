import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.sevice';
import { UserAuth } from 'src/models/userauth.iterface'


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(username: String, pass: String): Promise<any> {
    const user = await this.usersService.findByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserAuth) {
    const payload = { username: user.userName, password: user.password };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}