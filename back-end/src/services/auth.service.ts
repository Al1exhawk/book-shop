import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.sevice';


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

  async login(user: {username: String, password: String}) {
    const payload = { username: user.username, password: user.password };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}