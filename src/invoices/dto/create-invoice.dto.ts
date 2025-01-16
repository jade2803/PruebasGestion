import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator';

export class CreateInvoiceDto {
  @IsNumber()
  @IsOptional()
  returnId?: number;

  @IsDecimal()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsNotEmpty()
  cedula_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  telf?: string;

  // Añadir billing_status en el DTO
  @IsString()
  @IsOptional()
  billing_status?: string;
}
