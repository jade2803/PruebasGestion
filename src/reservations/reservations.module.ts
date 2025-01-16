import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './reservation.entity';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { VehicleEntity } from 'src/vehiculos/vehicle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, UsuarioEntity, VehicleEntity])],
  providers: [ReservationsService],
  controllers: [ReservationsController],
  exports: [ReservationsService],  // Exporta el servicio para que sea accesible en otros módulos
})
export class ReservationsModule {}
