import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreatePrescriptionDto {
  @IsUUID()
  @IsNotEmpty({ message: 'Appointment ID is required' })
  appointment: string;

  @IsUUID()
  @IsNotEmpty({ message: 'Doctor ID is required' })
  doctor: string;

  @IsString()
  @IsNotEmpty({ message: 'Diagnosis is required' })
  @Length(3, 255, {
    message: 'Diagnosis must be between 3 and 255 characters',
  })
  diagnosis: string;

  @IsString()
  @IsNotEmpty({ message: 'Treatment notes are required' })
  @Length(3, 255, {
    message: 'Treatment notes must be between 3 and 255 characters',
  })
  treatment_notes: string;

  @IsDateString({}, { message: 'Date must be a valid ISO 8601 date string' })
  @IsNotEmpty({ message: 'Date is required' })
  date: string;
}
