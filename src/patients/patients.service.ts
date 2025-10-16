import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient) private patientRepository: Repository<Patient>,
  ) {}
  async create(createPatientDto: CreatePatientDto) {
    const patient = this.patientRepository.create(createPatientDto);
    await this.patientRepository.save(patient);
    return patient;
  }

  async findAll() {
    return await this.patientRepository.find();
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) throw new NotFoundException('Patient not found!');
    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    await this.patientRepository.update({ id }, updatePatientDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.patientRepository.delete({ id });
  }
}
