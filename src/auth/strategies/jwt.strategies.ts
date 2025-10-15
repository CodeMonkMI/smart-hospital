import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { secrets } from '../constants/jwt';

@Injectable()
export class JWTStrategies extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secrets,
      ignoreExpiration: false,
    });
  }
  validate(payload: any): unknown {
    return payload;
  }
}
