import { NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from 'src/database/database.service';
import { getEnvOrThrow } from 'src/utils';

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private database: DatabaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: getEnvOrThrow('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: { sub: number }) {
    const me = await this.database.user.findUniqueOrThrow({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        rank: true,
        personalData: true,
      },
    });

    if (!me) {
      throw new NotFoundException('user not found');
    }

    return me;
  }
}
