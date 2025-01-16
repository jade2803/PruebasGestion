import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceRecordDto } from './dto/create-maintenance.dto';  // Asegúrate de importar el DTO
import { VehicleMaintenanceRecord } from './vehicle-maintenance-record.entity';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  async create(@Body() data: CreateMaintenanceRecordDto) {  // Usa el DTO aquí
    return this.maintenanceService.createMaintenanceRecord(data);
  }

  @Get()
  async findAll() {
    return this.maintenanceService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.maintenanceService.findById(id);
  }
  
}
