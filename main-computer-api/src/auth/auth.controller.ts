import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/dtos';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signup(@Body() dto: AuthDto) {
    // return this.authService.signup();
    return this.authService.signup(dto);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }

  @Get('get-error')
  getError() {
    return this.authService.getError();
  }
}
