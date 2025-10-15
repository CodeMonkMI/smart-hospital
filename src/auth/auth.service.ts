import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class AuthService {
  constructor(private doctorService: DoctorsService) {}
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
    // todo add jwt token features
    return userId;
  }
}
