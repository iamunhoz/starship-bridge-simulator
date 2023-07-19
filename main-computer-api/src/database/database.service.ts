import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getEnvOrThrow } from 'src/utils';

@Injectable()
export class DatabaseService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: getEnvOrThrow('DATABASE_URL'),
        },
      },
    });
  }
}
