/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from 'src/dtos';

@Injectable({})
export class AuthService {
  constructor(private database: DatabaseService) {}
  login() {
    return {
      msg: 'You have logged in',
    };
  }

  signup(dto: AuthDto) {
    return {
      msg: 'You have signed up',
      dto,
    };
  }

  getError() {
    throw new Error('testing error');
  }
}
