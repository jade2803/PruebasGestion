import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleMaintenanceRecord } from './vehicle-maintenance-record.entity';
import { VehicleEntity } from 'src/vehiculos/vehicle.entity'; // Importa la entidad Vehicle

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectRepository(VehicleMaintenanceRecord)
    private maintenanceRepository: Repository<VehicleMaintenanceRecord>,
    @InjectRepository(VehicleEntity)  // Repositorio del vehículo
    private vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async createMaintenanceRecord(data: any): Promise<any> {
    // Buscar el vehículo por ID
    const vehicle = await this.vehicleRepository.findOne({ where: { id: data.vehicle_id } });

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    // Crear un nuevo registro de mantenimiento
    const newRecord = this.maintenanceRepository.create({
      ...data,
      vehicle: vehicle,  // Asociar el vehículo con el registro de mantenimiento
    });

    // Guardar el registro de mantenimiento
    await this.maintenanceRepository.save(newRecord);

    // Actualizar el vehículo (cambiar su estado y disponibilidad)
    vehicle.status = 'Available';
    vehicle.available = true;

    // Guardar los cambios en el vehículo
    await this.vehicleRepository.save(vehicle);

    return { message: 'Maintenance record saved successfully' };
  }

  async findAll(): Promise<VehicleMaintenanceRecord[]> {
    return this.maintenanceRepository.find();
  }

  async findById(id: number): Promise<VehicleMaintenanceRecord> {
    return this.maintenanceRepository.findOne({ where: { id } });
  }

  async getAllMaintenanceRecords(): Promise<VehicleMaintenanceRecord[]> {
    return await this.maintenanceRepository.find();  // Devuelve todos los registros sin filtros
  }

    // Obtener el total de los gastos
    async getTotalGastos(): Promise<number> {
      const result = await this.maintenanceRepository
        .createQueryBuilder('maintenance')  // Usamos createQueryBuilder en el repositorio
        .select('SUM(maintenance.total_gastos)', 'total')  // Sumamos los gastos
        .getRawOne();  // Obtenemos el resultado como un solo valor
  
      return result.total || 0;  // Devuelve el total o 0 si no existe
    }
  
}
