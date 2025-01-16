import { IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator';

export class CreateMaintenanceRecordDto {
  @IsNumber()
  vehicle_id: number;  // Asegúrate de que este campo esté bien definido

  @IsString()
  @IsOptional()
  aceite_motor_filtro: string;

  @IsString()
  @IsOptional()
  filtro_aire: string;

  @IsString()
  @IsOptional()
  llantas: string;

  @IsString()
  @IsOptional()
  alineacion: string;

  @IsString()
  @IsOptional()
  amortiguadores: string;

  @IsString()
  @IsOptional()
  refrigerante: string;

  @IsString()
  @IsOptional()
  bateria: string;

  @IsString()
  @IsOptional()
  faros: string;

  @IsString()
  @IsOptional()
  liquido_direccion_hidraulica: string;

  @IsString()
  @IsOptional()
  liquido_frenos: string;

  @IsString()
  @IsOptional()
  correas: string;

  @IsString()
  @IsOptional()
  liquido_transmision: string;

  @IsDecimal()
  total_gastos: number;
}
