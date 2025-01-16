import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleEntity } from './vehicle.entity';
import { VehicleDto } from './dto/vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleEntity)
    private readonly vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async getAll(): Promise<VehicleEntity[]> {
    const vehicles = await this.vehicleRepository.find();
    if (vehicles.length === 0) {
      throw new NotFoundException('No hay vehículos registrados');
    }
    return vehicles;
  }

  async findById(id: number): Promise<VehicleEntity> {
    const vehicle = await this.vehicleRepository.findOne({ where: { id } });
    if (!vehicle) {
      throw new NotFoundException('Vehículo no encontrado');
    }
    return vehicle;
  }

  async create(dto: VehicleDto): Promise<any> {
    const vehicle = this.vehicleRepository.create(dto);
    await this.vehicleRepository.save(vehicle);
    return { message: 'Vehículo creado exitosamente' };
  }

  async update(id: number, dto: VehicleDto): Promise<any> {
    const vehicle = await this.findById(id);

    // Si el estado cambia a "Maintenance", establecemos 'available' en false.
    // Si el estado cambia a "Available", establecemos 'available' en true.
    if (dto.status === 'Maintenance') {
      vehicle.available = false;
    } else if (dto.status === 'Available') {
      vehicle.available = true;
    }

    // Actualizamos los nuevos campos junto con los anteriores
    Object.assign(vehicle, dto);
    await this.vehicleRepository.save(vehicle);

    return { message: 'Vehículo actualizado exitosamente' };
  }

  async delete(id: number): Promise<any> {
    const vehicle = await this.findById(id);
    await this.vehicleRepository.remove(vehicle);
    return { message: 'Vehículo eliminado exitosamente' };
  }
}
