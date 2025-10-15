import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { secrets } from './constants/jwt';
import { JWTStrategies } from './strategies/jwt.strategies';
import { LocalStrategies } from './strategies/local.strategies';

@Module({
  imports: [
    DoctorsModule,
    PassportModule,
    JwtModule.register({
      secret: secrets,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategies, JWTStrategies],
})
export class AuthModule {}
