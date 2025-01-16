import { VehicleEntity } from 'src/vehiculos/vehicle.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('vehicle_maintenance_records')
export class VehicleMaintenanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VehicleEntity, (vehicle) => vehicle.maintenanceRecords, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: VehicleEntity;

  @Column({ type: 'varchar', length: 20, nullable: true })
  aceite_motor_filtro: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  filtro_aire: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  llantas: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  alineacion: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  amortiguadores: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  refrigerante: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  bateria: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  faros: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  liquido_direccion_hidraulica: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  liquido_frenos: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  correas: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  liquido_transmision: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total_gastos: number;
}
