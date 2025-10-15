import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guard/jwt/jwt.guard';
import { LocalAuthGuard } from './guard/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.user.id as string);
  }

  @UseGuards(JwtGuard)
  @Get('/profile')
  profile(@Request() req) {
    return req.user;
  }
}
