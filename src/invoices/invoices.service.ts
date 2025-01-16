import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { Return } from 'src/return/return.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { ReturnsService } from 'src/return/return.service';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    private readonly returnsService: ReturnsService,  
    @InjectRepository(Return)
    private returnsRepository: Repository<Return>,  // Repositorio de Returns
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>  // Repositorio de Reservations
  ) {}

  // Obtener todas las facturas con las relaciones de 'return' y 'reservation'
  async findAll(): Promise<Invoice[]> {
    const invoices = await this.invoicesRepository.find({
      relations: ['return', 'return.reservation'],  // Incluimos la relación con 'reservation' a través de 'return'
    });

    return invoices;
  }  

  // Obtener una factura por ID
  async findOne(id: number): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findOne({
      where: { id },
      relations: ['return', 'return.reservation'], // Aseguramos que cargue también los datos de 'reservation'
    });

    return invoice;
  }

  async create(invoiceData: CreateInvoiceDto): Promise<Invoice> {
    const { returnId, ...invoiceFields } = invoiceData;

    if (returnId) {
      const returnEntity = await this.returnsService.findOne(returnId);  // Usa returnsService en lugar de directly using returnsRepository
      if (!returnEntity) {
        throw new Error(`Return with ID ${returnId} not found`);
      }

      const invoice = this.invoicesRepository.create({
        ...invoiceFields,
        return: returnEntity,
      });

      return this.invoicesRepository.save(invoice);
    }

    const invoice = this.invoicesRepository.create(invoiceFields);
    return this.invoicesRepository.save(invoice);
  }
  
  // Eliminar una factura
  async remove(id: number): Promise<void> {
    await this.invoicesRepository.delete(id);
  }

  async update(id: number, invoiceData: CreateInvoiceDto): Promise<Invoice> {
    const { returnId, billing_status, ...invoiceFields } = invoiceData;
  
    const invoice = await this.invoicesRepository.findOne({ where: { id }, relations: ['return', 'return.reservation'] });
  
    if (!invoice) {
      throw new Error(`Invoice with ID ${id} not found`);
    }
  
    // Si el billing_status es 'Facturado', se actualiza en el campo
    if (billing_status) {
      invoice.billing_status = billing_status;
    }
  
    if (returnId) {
      const returnEntity = await this.returnsService.findOne(returnId);
      if (!returnEntity) {
        throw new Error(`Return with ID ${returnId} not found`);
      }
  
      invoice.return = returnEntity;
    }
  
    // Actualizar los campos de la factura con los nuevos datos
    Object.assign(invoice, invoiceFields);
  
    // Actualizar el estado de la reserva si es necesario
    if (invoice.return) {
      const reservationId = invoice.return.reservation_id;
      if (reservationId) {
        await this.reservationsRepository.update(reservationId, { status: 'Completed' });
      }
    }
  
    return this.invoicesRepository.save(invoice);
  }

  async getSalesReport(): Promise<number> {
    const sales = await this.invoicesRepository.find();  // Traer todas las ventas
    
    // Si total ya es un número, no lo conviertas, simplemente suma
    const totalSales = sales.reduce((total, invoice) => total + invoice.total, 0);
    return totalSales;
  }
  
}
