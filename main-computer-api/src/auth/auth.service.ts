/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return {
      msg: 'You have logged in',
    };
  }
  signup() {
    return {
      msg: 'You have signed up',
    };
  }
}
