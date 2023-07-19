import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private database: DatabaseService) {}

  getAllUsers() {
    return this.database.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        rank: true,
      },
    });
  }
}
