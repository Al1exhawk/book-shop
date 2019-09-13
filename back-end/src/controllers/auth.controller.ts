import { User } from 'src/models';
import { LoginModel } from 'src/models';
import { ApiUseTags } from '@nestjs/swagger';
import { UserService } from 'src/services';
import { AuthService } from 'src/services';
import { LoginResponse } from 'src/models';
import { RegistrationModel } from 'src/models';
import { Controller, Post, Body } from '@nestjs/common';

@ApiUseTags('Login')

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
  async registration(@Body() user: RegistrationModel): Promise<User> {
    const newUser: User = await this.userService.create(user);

    return newUser;
  }
}
