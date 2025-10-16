import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  private selectedData = {
    id: true,
    name: true,
    specialization: true,
    contact: true,
    email: true,
    appointments: true,
    prescriptions: true,
  };

  async create(createDoctorDto: CreateDoctorDto) {
    const hash = await this.hashPassword(createDoctorDto.password);
    const doctor = this.doctorRepository.create({
      ...createDoctorDto,
      password: hash,
    });
    return await this.doctorRepository.save(doctor);
  }

  async findByEmail(email: string) {
    return this.doctorRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findAll() {
    const allDoctors = await this.doctorRepository.find({
      select: {
        ...this.selectedData,
      },
      loadRelationIds: {
        relations: ['appointments', 'prescriptions'],
      },
    });
    return allDoctors;
  }

  async findOne(id: string) {
    const data = await this.doctorRepository.findOne({
      where: { id },
      select: { ...this.selectedData },
      loadRelationIds: {
        relations: ['appointments', 'prescriptions'],
      },
    });
    if (!data) throw new NotFoundException('User not found!');
    return data;
  }

  async update(id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.doctorRepository.update({ id }, updateDoctorDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.doctorRepository.delete({ id });
  }

  // private
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
