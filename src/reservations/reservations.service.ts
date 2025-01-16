// src/reservations/reservations.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { VehicleEntity } from 'src/vehiculos/vehicle.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(UsuarioEntity)
    private usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(VehicleEntity)
    private vehicleRepository: Repository<VehicleEntity>,
  ) {}

  async createReservation(reservationData: CreateReservationDto): Promise<Reservation> {
    const { customerId, vehicleId, start_date, end_date, status, warranty, total } = reservationData;
  
    // Buscar el usuario por su ID
    const customer = await this.usuarioRepository.findOne({
      where: { id: customerId },
    });
  
    if (!customer) {
      throw new Error(`User with ID ${customerId} not found`);
    }
  
    // Buscar el vehículo por su ID
    const vehicle = await this.vehicleRepository.findOne({
      where: { id: vehicleId },
    });
  
    if (!vehicle) {
      throw new Error(`Vehicle with ID ${vehicleId} not found`);
    }
  
    // Crear la reserva con las relaciones encontradas y los campos warranty y total
    const reservation = this.reservationRepository.create({
      customer,
      vehicle,
      start_date: new Date(start_date),
      end_date: new Date(end_date),
      status,
      warranty,  // Asignar warranty
      total,      // Asignar total
    });
  
    // Guarda la reserva en la base de datos
    const savedReservation = await this.reservationRepository.save(reservation);
    return savedReservation;
  }
  
  
  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationRepository.find({
      relations: ['customer', 'vehicle'], // Incluye las relaciones
    });
  }
  
  async getReservationById(id: number): Promise<Reservation> {
    return this.reservationRepository.findOne({ where: { id } });
  }

  async updateReservation(
    id: number,
    updateData: Partial<Reservation>,
  ): Promise<Reservation> {
    await this.reservationRepository.update(id, updateData);
    return this.getReservationById(id);
  }

  async deleteReservation(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }

  async getReservationsByUser(userId: number): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { customer: { id: userId } }, // Filtra por el ID del usuario
      relations: ['customer', 'vehicle'],  // Incluye las relaciones necesarias
    });
  }
  
}