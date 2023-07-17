import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [AuthModule, UserModule, SensorsModule],
})
export class AppModule {}
