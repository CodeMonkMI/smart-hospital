import {
  IsDateString,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { AppointmentStatus } from '../entities/appointment.entity';

export class CreateAppointmentDto {
  @IsUUID()
  @IsNotEmpty({ message: 'Patient ID is required' })
  patient: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Doctor ID is required' })
  doctor: string;

  @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string' })
  @IsNotEmpty({ message: 'Date is required' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'Time is required' })
  @IsMilitaryTime()
  time: string;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
}
