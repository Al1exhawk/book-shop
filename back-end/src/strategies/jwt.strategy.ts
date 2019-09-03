import constants from 'src/environment/constants';
import { JWTpayload } from 'src/models/jwt-payload';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: constants.secret,
    });
  }

  async validate(payload: JWTpayload) {
    return { userName: payload.userName, password: payload.password };
  }
}
