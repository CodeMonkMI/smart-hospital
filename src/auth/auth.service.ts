import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class AuthService {
  constructor(
    private doctorService: DoctorsService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<{ id: string; email: string }> {
    const user = await this.doctorService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid user credentials!');
    const isPasswordMatch: boolean = await compare(password, user.password);
    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid user credentials!');
    return { id: user.id, email: user.email };
  }

  login(userId: string) {
    return { access_token: this.jwtService.sign({ sub: userId }) };
  }

  profile(userId: string) {
    return this.doctorService.findOne(userId);
  }
}
