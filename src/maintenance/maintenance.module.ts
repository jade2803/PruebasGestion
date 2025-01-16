import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';  
import { MaintenanceService } from './maintenance.service'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleMaintenanceRecord } from './vehicle-maintenance-record.entity';  
import { VehicleEntity } from 'src/vehiculos/vehicle.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([VehicleMaintenanceRecord, VehicleEntity]), 
  ],
  controllers: [MaintenanceController], 
  providers: [MaintenanceService], 
})
export class MaintenanceModule {}
