import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
  ) {}
  async create(createPrescriptionDto: CreatePrescriptionDto) {
    const prescription = this.prescriptionRepository.create({
      ...createPrescriptionDto,
      appointment: { id: createPrescriptionDto.appointment },
      doctor: { id: createPrescriptionDto.doctor },
    });
    return await this.prescriptionRepository.save(prescription);
  }

  async findAll() {
    return await this.prescriptionRepository.find({
      relations: ['appointment', 'doctor'],
      select: {
        id: true,
        diagnosis: true,
        treatment_notes: true,
        date: true,
        appointment: {
          date: true,
          id: true,
          prescriptions: true,
          status: true,
          time: true,
        },
        doctor: {
          id: true,
          name: true,
          specialization: true,
          contact: true,
          email: true,
          prescriptions: true,
        },
      },
    });
  }

  async findOne(id: string) {
    const prescription = await this.prescriptionRepository.findOneBy({ id });
    if (!prescription) throw new NotFoundException('Prescription not found!');
    return prescription;
  }

  async update(id: string, updatePrescriptionDto: UpdatePrescriptionDto) {
    await this.prescriptionRepository.update({ id }, updatePrescriptionDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.prescriptionRepository.delete({ id });
  }
}
