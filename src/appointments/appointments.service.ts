import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  private select = {
    date: true,
    id: true,
    prescriptions: true,
    status: true,
    time: true,
    doctor: {
      id: true,
      name: true,
      specialization: true,
      contact: true,
      email: true,
      appointments: true,
      prescriptions: true,
    },
  };

  async create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      patient: { id: createAppointmentDto.patient },
      doctor: { id: createAppointmentDto.doctor },
    });
    return await this.appointmentRepository.save(appointment);
  }

  async findAll() {
    return await this.appointmentRepository.find({
      select: { ...this.select },
      relations: ['doctor', 'patient'],
    });
  }

  async findOne(id: string) {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      select: { ...this.select },
      relations: ['doctor', 'patient'],
    });

    if (!appointment) throw new NotFoundException('Appointment not found!');
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    await this.appointmentRepository.update({ id }, updateAppointmentDto);
    return await this.findOne(id);
  }

  async remove(id: string) {
    return await this.appointmentRepository.delete({ id });
  }
}
