import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), DoctorsModule],
  controllers: [AppointmentsController],
  providers: [AppointmentsService, TypeOrmModule],
})
export class AppointmentsModule {}
