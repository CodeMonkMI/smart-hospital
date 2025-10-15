import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Appointment, (app) => app.patient)
  appointments: Appointment[];

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  age: number;

  @Column({ type: 'varchar' })
  gender: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  contact: string;

  @Column({ type: 'varchar' })
  reg_date: string;
}
