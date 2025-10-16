import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptionDto } from './create-prescription.dto';

export class UpdatePrescriptionDto extends PartialType(
  OmitType(CreatePrescriptionDto, ['appointment', 'date', 'doctor']),
) {}
