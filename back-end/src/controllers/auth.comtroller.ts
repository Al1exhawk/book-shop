import { JWTpayload } from 'src/models/jwt-payload.model';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/services/auth.service';
import { Controller, Post, UseGuards, Body } from '@nestjs/common';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Body() user: JWTpayload): Promise<string> {
    const accessToken = await this.authService.login(user);
    return accessToken;
  }
}
