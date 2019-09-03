import { JWTpayload } from 'src/models/jwt-payload';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.usersService.findByName(userName);
    if (user && user.password === password && user.userName === userName) {
      return user;
    }
    return null;
  }

  async login(user: JWTpayload): Promise<string> {
    const payload = { userName: user.userName, password: user.password };
    const  accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }
}
