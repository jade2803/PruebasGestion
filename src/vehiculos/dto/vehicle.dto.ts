import { IsString, IsNotEmpty, IsOptional, IsEnum, IsBoolean, IsNumber, IsUrl } from 'class-validator';

export class VehicleDto {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  license_plate: string;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsNumber()
  @IsNotEmpty()
  rental_rate: number;

  @IsEnum(['Available', 'Maintenance'])
  @IsOptional()
  status?: 'Available' | 'Maintenance';

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  // Nuevos campos
  @IsNumber()
  @IsNotEmpty()
  seats: number;  // Número de asientos

  @IsNumber()
  @IsNotEmpty()
  doors: number;  // Número de puertas

  @IsNumber()
  @IsNotEmpty()
  trunk_size: number;  // Tamaño de la cajuela

  @IsString()
  @IsNotEmpty()
  color: string;  // Color del vehículo

  @IsEnum(['Extra', 'Diesel', 'Super'])
  @IsNotEmpty()
  fuel_type: 'Extra' | 'Diesel' | 'Super';  // Tipo de combustible
}
