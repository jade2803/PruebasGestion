import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { ReturnsService } from './return.service';
import { Return } from './return.entity';

@Controller('returns')  // Asegúrate de que la ruta sea plural
export class ReturnsController {
  constructor(private readonly returnsService: ReturnsService) {}

  @Post()
  async createReturn(@Body() createReturnDto: CreateReturnDto) {
    console.log('Datos recibidos:', createReturnDto); // LOG IMPORTANTE
    return this.returnsService.createReturn(createReturnDto);
  }
  

  // Método para obtener todas las devoluciones
  @Get()
  async findAll(): Promise<Return[]> {
    return this.returnsService.findAll();  // Llama al servicio para obtener todas las devoluciones
  }

  // Método para obtener una devolución por ID (opcional)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Return> {
    return this.returnsService.findOne(id);  // Llama al servicio para obtener una devolución por ID
  }
} 