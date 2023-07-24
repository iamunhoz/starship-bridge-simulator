import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { EditUserBody, UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('everyone')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Put(':id')
  editUser(@Param('id') id: string, @Body() body: EditUserBody) {
    console.log('id, req', id, body);

    // return 'in test';
    return this.userService.editUser(Number(id), body);
  }
}
