import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import {ConfigService} from './config.service';
import { Injectable, HttpException, HttpStatus, forwardRef } from '@nestjs/common';
import { LoginModel, UserModel, LoginResponse, JWTpayload } from '../models';
import {send, setApiKey} from '@sendgrid/mail';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService) {
      setApiKey(this.configService.SEND_GRID_API);
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

  async sendmail(userName: string, confirmPassword: boolean ) {
    if (confirmPassword === false) {
      const mailToken =  this.jwtService.sign({userName});

      const msg = {
        to: 'aldevid9@gmail.com',
        from: 'aldevid9@gmail.com',
        subject: 'Sending with Twilio SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<a href="http://localhost:3000/${mailToken}">Please, confirm your password</a>`,
      };
      const res = await send(msg);

    }
  }
}
