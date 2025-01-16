import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateReturnDto {
  @IsDateString()
  returnDate: string;

  @IsString()
  vehicleCondition: string;

  @IsNumber()
  additionalCharge: number;

  @IsNumber()
  reservation_id: number;
}
