import constants from 'src/environment/constants';
import { JWTpayload } from 'src/models/jwt-payload.model';
import { AuthService } from 'src/services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.secret,
    });
  }

  async validate(payload: JWTpayload, done: VerifiedCallback) {
    const user = await this.authService.validatePayload(payload);
    if (!user) {
      return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
    }

    return  done(null, user);
  }
}