import 'reflect-metadata';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { DataSource } from 'typeorm';
import { runSeed } from './seed.service';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? 'postgres',
  database: process.env.DB_NAME ?? 'hms',
  synchronize: true, // safe for dev only
  entities: [Doctor, Patient, Appointment, Prescription],
});

async function bootstrap() {
  try {
    await dataSource.initialize();
    console.log('✅ Database connected.');
    await runSeed(dataSource);
  } catch (e) {
    console.error('❌ Error seeding:', e);
  } finally {
    await dataSource.destroy();
  }
}

bootstrap();
