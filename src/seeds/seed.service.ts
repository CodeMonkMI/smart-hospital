/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faker } from '@faker-js/faker';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { GenderEnum, Patient } from 'src/patients/entities/patient.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { DataSource } from 'typeorm';
import {
  Appointment,
  AppointmentStatus,
} from '../appointments/entities/appointment.entity';

export async function runSeed(dataSource: DataSource) {
  const prescriptionRepo = dataSource.getRepository(Prescription);
  const appointmentRepo = dataSource.getRepository(Appointment);
  const patientRepo = dataSource.getRepository(Patient);
  const doctorRepo = dataSource.getRepository(Doctor);

  console.log('🧹 Clearing existing records...');
  await prescriptionRepo.deleteAll();
  await appointmentRepo.deleteAll();
  await doctorRepo.deleteAll();
  await patientRepo.deleteAll();

  faker.seed(123); // deterministic

  // ---- Doctors ----
  const doctors: Doctor[] = [];
  for (let i = 0; i < 10; i++) {
    const doc = doctorRepo.create({
      name: faker.person.fullName(),
      specialization: faker.helpers.arrayElement([
        'Cardiology',
        'Neurology',
        'Orthopedics',
        'Pediatrics',
        'Dermatology',
        'Gynecology',
        'Radiology',
        'Psychiatry',
      ]),
      contact: `+8801${faker.string.numeric(9)}`,
      email: faker.internet.email().toLowerCase(),
      password: faker.internet.password({ length: 10 }),
    });
    doctors.push(doc);
  }
  await doctorRepo.save(doctors);
  console.log(`✅ Seeded ${doctors.length} doctors.`);

  // ---- Patients ----
  const patients: Patient[] = [];
  for (let i = 0; i < 30; i++) {
    const p = patientRepo.create({
      name: faker.person.fullName(),
      age: faker.number.int({ min: 5, max: 90 }),
      gender: faker.helpers.arrayElement([GenderEnum.MALE, GenderEnum.FEMALE]),
      address: faker.location.streetAddress(),
      contact: `+8801${faker.string.numeric(9)}`,
      reg_date: faker.date.recent({ days: 60 }).toISOString().split('T')[0],
    });
    patients.push(p);
  }
  await patientRepo.save(patients);
  console.log(`✅ Seeded ${patients.length} patients.`);

  // ---- Appointments & Prescriptions ----
  const appointments: Appointment[] = [];
  const prescriptions: Prescription[] = [];

  for (let i = 0; i < 50; i++) {
    const doctor = faker.helpers.arrayElement(doctors);
    const patient = faker.helpers.arrayElement(patients);
    const date = faker.date.soon({ days: 20 });
    const appointment = appointmentRepo.create({
      doctor,
      patient,
      date: date.toISOString().split('T')[0],
      time: faker.date
        .soon({ days: 1, refDate: date })
        .toISOString()
        .split('T')[1]
        .slice(0, 8),
      status: faker.helpers.arrayElement([
        AppointmentStatus.PENDING,
        AppointmentStatus.DONE,
      ]),
    });

    await appointmentRepo.save(appointment);
    appointments.push(appointment);

    // If done, create prescription
    if (appointment.status === AppointmentStatus.DONE) {
      const pres = prescriptionRepo.create({
        appointment,
        doctor,
        diagnosis: faker.lorem.words({ min: 2, max: 5 }),
        treatment_notes: faker.lorem.sentence(),
        date: appointment.date,
      });
      prescriptions.push(pres);
    }
  }

  await prescriptionRepo.save(prescriptions);
  console.log(
    `✅ Seeded ${appointments.length} appointments & ${prescriptions.length} prescriptions.`,
  );
}
