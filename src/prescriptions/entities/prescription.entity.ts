import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Appointment, (app) => app.prescriptions)
  @JoinColumn()
  appointment: Appointment;

  @ManyToOne(() => Doctor, (doc) => doc.prescriptions)
  @JoinTable()
  doctor: Doctor;

  @Column({ type: 'varchar', length: 255 })
  diagnosis: string;

  @Column({ type: 'varchar', length: 255 })
  treatment_notes: string;

  @Column({ type: 'varchar', length: 255 })
  date: string;
}
