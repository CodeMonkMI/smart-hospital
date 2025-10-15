import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all doctors`;
  }

  async findOne(id: string) {
    const data = await this.doctorRepository.findOne({
      where: { id },
    });
    return {
      ...data,
      password: '',
    };
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor ${JSON.stringify(updateDoctorDto)}`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }

  // private
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
