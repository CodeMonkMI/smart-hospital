import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Appointment, (app) => app.patient)
  appointments: Appointment[];

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'integer' })
  age: number;

  @Column({ type: 'varchar', enum: GenderEnum })
  gender: GenderEnum;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  contact: string;

  @Column({ type: 'varchar' })
  reg_date: string;
}
