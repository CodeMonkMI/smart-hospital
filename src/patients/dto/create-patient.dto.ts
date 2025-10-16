import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { GenderEnum } from '../entities/patient.entity';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(120)
  age: number;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsNotEmpty()
  @IsString()
  @Length(4, 100)
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(11, 14)
  contact: string;

  @IsNotEmpty()
  @IsDateString()
  reg_date: string;
}
