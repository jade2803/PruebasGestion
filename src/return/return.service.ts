import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Return } from './return.entity';
import { CreateReturnDto } from './dto/create-return.dto';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(Return)
    private readonly returnsRepository: Repository<Return>, // Correcto
  ) {}

  async createReturn(data: CreateReturnDto): Promise<Return> {
    const newReturn = this.returnsRepository.create({
      return_date: new Date(data.returnDate),
      vehicle_condition: data.vehicleCondition,
      additional_charge: data.additionalCharge,
      reservation_id: data.reservation_id,
    });

    return this.returnsRepository.save(newReturn);
  }

  // Método para obtener todas las devoluciones
  async findAll(): Promise<Return[]> {
    return this.returnsRepository.find();
  }

  // Método para obtener una devolución por ID
  async findOne(id: number): Promise<Return> {
    return this.returnsRepository.findOne({
      where: { id }, // Pasa el id dentro de un objeto con la clave 'where'
    });
  }
}
