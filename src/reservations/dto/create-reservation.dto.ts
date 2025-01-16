// src/reservations/dto/create-reservation.dto.ts
import { IsInt, IsDateString, IsEnum, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  @IsDateString()
  @IsNotEmpty()
  start_date: string;

  @IsDateString()
  @IsNotEmpty()
  end_date: string;

  @IsEnum(['Confirmed', 'Cancelled', 'Completed', 'Facturacion'], {
    message: 'Status must be Confirmed, Cancelled, Completed or Facturacion',
  })
  status: 'Confirmed' | 'Cancelled' | 'Completed' | 'Facturacion';

  @IsOptional()
  @IsNumber()
  warranty?: number; // Nuevo campo

  @IsOptional()
  @IsNumber()
  total?: number; // Nuevo campo
}
