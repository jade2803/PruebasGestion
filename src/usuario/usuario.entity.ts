import { Reservation } from 'src/reservations/reservation.entity';
import { Column, Entity, PrimaryGeneratedColumn, Timestamp, OneToMany } from 'typeorm';

@Entity('users')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'enum', enum: ['Administrator', 'Employee', 'Customer'], nullable: false })
  role: string;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Timestamp;

  @OneToMany(() => Reservation, (reservation) => reservation.customer)
  reservations: Reservation[];
}
