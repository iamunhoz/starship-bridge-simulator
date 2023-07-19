import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/everyone')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@Req() req: Request) {
    console.log('/user/me req', req.user);

    // const userId = (req.user as { sub: number }).sub;
    return 'this is me';
    // return this.userService.getMe(userId);
  }
}
