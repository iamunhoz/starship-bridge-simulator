/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from 'src/dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { getEnvOrThrow } from 'src/utils';

@Injectable({})
export class AuthService {
  constructor(private database: DatabaseService, private jwt: JwtService) {}

  blockAccess() {
    throw new UnauthorizedException({
      message: 'Invalid credentials',
    });
  }

  async signToken(userId: number, email: string) {
    const payload = {
      sub: userId,
      email,
    };

    const signedData = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: getEnvOrThrow('JWT_SECRET'),
    });

    return signedData;
  }

  async login(dto: AuthDto) {
    try {
      // find the user by email, throw exception if not found
      const user = await this.database.user.findUniqueOrThrow({
        where: {
          email: dto.email,
        },
      });

      // compare passwords, throw exception if not equal
      const passwordsMatch = await argon.verify(user.hash, dto.password);

      if (passwordsMatch) {
        const signedUser = {
          access_token: await this.signToken(user.id, user.email),
        };

        return signedUser;
      } else {
        this.blockAccess();
      }

      // return the found & authenticated by password user
    } catch (error) {
      if (error.code === 'P2025') {
        this.blockAccess();
      }

      throw error;
    }
  }

  async signup(dto: AuthDto) {
    try {
      // generate password hash
      const hash = await argon.hash(dto.password);
      // save new user in database
      const user = await this.database.user.create({
        data: {
          email: dto.email,
          hash,
          rank: 'undefined',
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });

      // somewhere, ranks need to be defined by querying
      // a third-party database from the federation

      // return new user data from db to clients
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException({
            message: 'This e-mail is already in use.',
          });
        }
      }
      throw error;
    }
  }

  getError() {
    throw new Error('testing error');
  }
}
