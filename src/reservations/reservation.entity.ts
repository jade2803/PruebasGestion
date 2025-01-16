// src/reservations/reservation.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { VehicleEntity } from 'src/vehiculos/vehicle.entity';
import { Return } from 'src/return/return.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UsuarioEntity, (user) => user.reservations) // Quitar eager
  customer: UsuarioEntity;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.reservations) // Quitar eager
  vehicle: VehicleEntity;

  @CreateDateColumn()
  reservation_date: Date;

  @Column({ type: 'datetime', nullable: true })
  start_date: Date;

  @Column({ type: 'datetime', nullable: true })
  end_date: Date;

  @Column({
    type: 'enum',
    enum: ['Confirmed', 'Cancelled', 'Completed','Facturacion'],
    default: 'Confirmed',
  })
  status: 'Confirmed' | 'Cancelled' | 'Completed' | 'Facturacion';

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  warranty: number; // Nuevo campo para la garantía

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  total: number; // Nuevo campo para el total

  @OneToMany(() => Return, (returnEntity) => returnEntity.reservation) // Relación OneToMany con Return
  returns: Return[];
}


