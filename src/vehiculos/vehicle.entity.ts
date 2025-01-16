import { VehicleMaintenanceRecord } from 'src/maintenance/vehicle-maintenance-record.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('vehicles')
export class VehicleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  brand: string;

  @Column({ length: 50 })
  model: string;

  @Column({ length: 20, unique: true })
  license_plate: string;

  @Column({ default: true })
  available: boolean;

  @Column('decimal', { precision: 10, scale: 2 })
  rental_rate: number;

  @Column({ type: 'enum', enum: ['Available', 'Maintenance'], default: 'Available' })
  status: 'Available' | 'Maintenance';

  @Column({ type: 'text' })
  imageUrl: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  seats: number;

  @Column()
  doors: number;

  @Column('decimal', { precision: 10, scale: 2 })
  trunk_size: number;

  @Column({ length: 30 })
  color: string;

  @Column({ type: 'enum', enum: ['Extra', 'Diesel', 'Super'] })
  fuel_type: 'Extra' | 'Diesel' | 'Super';

  @OneToMany(() => Reservation, (reservation) => reservation.vehicle)
  reservations: Reservation[];

  @OneToMany(() => VehicleMaintenanceRecord, (record) => record.vehicle)
  maintenanceRecords: VehicleMaintenanceRecord[];
}
