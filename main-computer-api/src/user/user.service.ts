import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { User } from '@prisma/client';

export type EditUserBody = Partial<Omit<User, 'hash'>>;

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

  async editUser(id: number, body: EditUserBody) {
    const result = await this.database.user.update({
      where: {
        id,
      },
      data: {
        ...body,
      },
    });
    console.log(' update result', result);

    return result;
  }
}
