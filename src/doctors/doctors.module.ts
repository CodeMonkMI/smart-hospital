import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';
import { IsUniqueEmailConstraint } from './validators/is-unique-email.validator';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  controllers: [DoctorsController],
  providers: [DoctorsService, IsUniqueEmailConstraint],
  exports: [DoctorsService, TypeOrmModule],
})
export class DoctorsModule {}
