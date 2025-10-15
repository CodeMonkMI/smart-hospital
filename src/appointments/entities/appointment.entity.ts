import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum AppointmentStatus {
  PENDING = 'pending',
  DONE = 'done',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, (pa) => pa.appointments)
  @JoinColumn()
  patient: Patient;

  @ManyToOne(() => Doctor, (doc) => doc.appointments, { onDelete: 'CASCADE' })
  @JoinColumn()
  doctor: Doctor;

  @OneToOne(() => Prescription, (prs) => prs.appointment)
  @JoinTable()
  prescriptions: Prescription;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  time: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;
}
