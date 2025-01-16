import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Return } from './return.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { ReturnsService } from './return.service';
import { ReturnsController } from './return.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Return, Reservation])],  // Asegúrate de incluir 'Return' aquí
  providers: [ReturnsService],
  controllers: [ReturnsController],
  exports: [ReturnsService],  // Exporta ReturnsService para que otros módulos lo puedan usar si es necesario
})
export class ReturnsModule {}