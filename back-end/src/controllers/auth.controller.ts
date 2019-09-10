import { LoginModel } from 'src/models/login.model';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthService } from 'src/services/auth.service';
import { LoginResponse } from 'src/models/login-response.model';
import { Controller, Post, Body } from '@nestjs/common';

@ApiUseTags('Login')

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() user: LoginModel): Promise<LoginResponse> {
    const loginResponse: LoginResponse = await this.authService.login(user);

    return loginResponse;
  }
}
