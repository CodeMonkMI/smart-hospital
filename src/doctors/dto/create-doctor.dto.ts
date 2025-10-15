import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUniqueEmail } from '../validators/is-unique-email.validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  specialization: string;

  @IsNotEmpty()
  @IsString()
  contact: string;

  @IsNotEmpty()
  @IsEmail()
  @IsUniqueEmail({ message: 'Email already exist!' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 12)
  password: string;
}
