import { Controller, Get, Res, HttpStatus, Param, Post, Body } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioEntity } from './servicio.entity';

@Controller('servicio')
export class ServicioController {
    constructor(private servicioService: ServicioService){}

    @Get()
    public async getAllServicio(@Res() res){
        const servicio = await this.servicioService.getAllServicio();
        res.status(HttpStatus.OK).json(servicio);

    }

    @Get(':id')
    public async getCommand(@Res() res, @Param('id') id){
        const servicio = await this.servicioService.getServicioByID(id);
        res.status(HttpStatus.OK).json(servicio);
    }

    @Post()
    public async createServicio(@Res() res, @Body() newServicio : ServicioEntity){

        const result = await this.servicioService.createServicio(newServicio);
        res.status(HttpStatus.CREATED).json(result);
    }

}
