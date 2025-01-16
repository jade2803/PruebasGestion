import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleDto } from './dto/vehicle.dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async getAll() {
    return await this.vehicleService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.findById(id);
  }

  @Post()
  async create(@Body() dto: VehicleDto) {
    return await this.vehicleService.create(dto);
  }
  
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: VehicleDto) {
    return await this.vehicleService.update(id, dto);
  }  

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.vehicleService.delete(id);
  }
}
