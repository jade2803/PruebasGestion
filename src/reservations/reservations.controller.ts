import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async createReservation(@Body() reservationData: CreateReservationDto): Promise<Reservation> {
    console.log('Received reservation data:', reservationData); // Verifica si warranty y total están aquí
    return this.reservationsService.createReservation(reservationData);
  }  

  @Get()
  async getAllReservations(): Promise<Reservation[]> {
    return this.reservationsService.getAllReservations();
  }

  @Get(':id')
  async getReservationById(@Param('id') id: number): Promise<Reservation> {
    return this.reservationsService.getReservationById(id);
  }

  @Patch(':id')
  async updateReservation(
    @Param('id') id: number,
    @Body() updateData: Partial<Reservation>,
  ): Promise<Reservation> {
    return this.reservationsService.updateReservation(id, updateData);
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: number): Promise<{ message: string }> {
    await this.reservationsService.deleteReservation(id);
    return { message: 'Reservation deleted successfully' };
  }

  @Get('user/:userId')
  async getReservationsByUser(@Param('userId') userId: number): Promise<Reservation[]> {
    return this.reservationsService.getReservationsByUser(userId);
  }

  @Post('complete')
  async completeReservation(@Body('sessionId') sessionId: string) {
    // Lógica para completar la reservación con el sessionId
    console.log(`Completando reservación para sessionId: ${sessionId}`);
    return { message: 'Reservación completada exitosamente' };
  }
}
