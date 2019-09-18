import { ApiUseTags } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { UserService, AuthService } from '../services';
import { RegistrationModel, LoginModel, UserModel, LoginResponse } from '../models';

@ApiUseTags('Auth')

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    ) {}

  @Post('login')
  async login(@Body() user: LoginModel): Promise<LoginResponse> {
    const loginResponse: LoginResponse = await this.authService.login(user);

    return loginResponse;
  }

  @Post('registration')
  async registration(@Body() user: RegistrationModel): Promise<UserModel> {
    const newUser: UserModel = await this.userService.create(user);

    return newUser;
  }
}
