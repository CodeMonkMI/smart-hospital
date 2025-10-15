import { Module } from '@nestjs/common';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategies } from './strategies/local.strategies';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategies],
  imports: [DoctorsModule],
})
export class AuthModule {}
