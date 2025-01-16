import { Reservation } from 'src/reservations/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('returns')
export class Return {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: true })
  return_date: Date;

  @Column({ type: 'varchar', length: 50 })
  vehicle_condition: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  additional_charge: number;

  @Column()
  reservation_id: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.returns, { eager: true }) // Establecer relación ManyToOne con Reservation
  @JoinColumn({ name: 'reservation_id' }) // Asociamos el campo reservation_id con la tabla reservations
  reservation: Reservation; // Esto es lo que te permitirá acceder a la información de la reserva
}
