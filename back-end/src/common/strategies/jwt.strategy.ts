import { JWTpayload } from '../..//models';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService, ConfigService } from '../../services';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.JWT_SECRET,
    });
  }

  async validate(payload: JWTpayload, done: VerifiedCallback) {
    const user = await this.authService.validatePayload(payload);
    if (!user) {
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }

    return done(null, user);
  }
}
