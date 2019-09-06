import { Login } from 'src/models/login.model';
import { AuthService } from 'src/services/auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { LoginResponse } from 'src/models/login-response.model';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() user: Login): Promise<LoginResponse> {
    const loginResponse: LoginResponse = await this.authService.login(user);

    return loginResponse;
  }
}
