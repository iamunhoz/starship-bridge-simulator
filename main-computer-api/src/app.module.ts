import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SensorsModule } from './sensors/sensors.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, UserModule, SensorsModule, DatabaseModule],
})
export class AppModule {}
