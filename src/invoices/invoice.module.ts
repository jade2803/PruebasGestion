import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './invoice.entity';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { ReturnsService } from 'src/return/return.service';
import { Return } from 'src/return/return.entity';
import { ReservationsModule } from 'src/reservations/reservations.module';  // Asegúrate de importar el módulo de reservas
import { Reservation } from 'src/reservations/reservation.entity';  // Asegúrate de importar la entidad de reservas

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice, Return, Reservation]),  // Agrega Reservation aquí
    ReservationsModule,  // Asegúrate de que este módulo esté importado
  ],
  providers: [InvoicesService, ReturnsService],
  controllers: [InvoicesController],
})
export class InvoicesModule {}