/* eslint-disable @typescript-eslint/no-empty-function */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from 'src/dtos';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable({})
export class AuthService {
  constructor(private database: DatabaseService) {}
  login() {
    return {
      msg: 'You have logged in',
    };
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
