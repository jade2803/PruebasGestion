import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Return } from 'src/return/return.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Return, (ret) => ret.id, { eager: true, nullable: true })
  return: Return;  

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  issue_date: Date;

  @Column({ type: 'varchar', length: 20 })
  cedula_id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  telf: string;

  // Nuevo campo billing_status
  @Column({ type: 'varchar', length: 20, default: 'No Facturado' })
  billing_status: string; // 'Facturado' o 'No Facturado'
}
