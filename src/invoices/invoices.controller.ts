import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';  // Asegúrate de importar el DTO adecuado
import { Invoice } from './invoice.entity';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() invoiceData: CreateInvoiceDto): Promise<Invoice> {  // Cambia el tipo aquí
    return this.invoicesService.create(invoiceData);
  }

  @Get()
  findAll(): Promise<Invoice[]> {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Invoice> {
    return this.invoicesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() invoiceData: CreateInvoiceDto): Promise<Invoice> {
    return this.invoicesService.update(id, invoiceData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.invoicesService.remove(id);
  }

  @Get()
  async getSalesReport() {
    const salesTotal = await this.invoicesService.getSalesReport();
    return salesTotal;
  }

}
