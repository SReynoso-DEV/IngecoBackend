import { Controller, Get, Res, Req, HttpStatus, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EleccionService } from './eleccion.service';
import { EleccionEntity } from './eleccion.entity';

@Controller('eleccion')
export class EleccionController {
    constructor(private eleccionService: EleccionService){}

    /*@Get()
    public async getAllEleccion(@Res() res, @Req() req){
        const eleccion = await this.eleccionService.getAllEleccion();
        console.log(req.payload);
        res.status(HttpStatus.OK).json(eleccion);
    }*/

    @Get()
    public async getEleccionByEmpleado(@Res() res , @Req() req){
        const eleccion = await this.eleccionService.getEleccionByEmpleado(req.payload.id);
        console.log(req.payload);
        res.status(HttpStatus.OK).json(eleccion);
    }



    @Post()
    public async createEleccion(@Res() res, @Body() newEL : EleccionEntity, @Body('bancoid') bancoid, @Req() req){
        const result = await this.eleccionService.createEleccion(newEL,bancoid,req.payload.id);
        res.status(HttpStatus.CREATED).json(result);
    }

    @Put(':id')
    public async updateEleccion(@Res() res, @Body() EL : EleccionEntity, @Param('id') id){
        const result = await this.eleccionService.editEleccion(EL,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    }
    @Put('trea/:id')
    public async calcularTrea(@Res() res, @Body() EL : EleccionEntity, @Param('id') id){
        const result = await this.eleccionService.calcular(EL,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    }

    @Delete(':id')
    public async deleteEL(@Res() res, @Param('id') id){
        const result = await this.eleccionService.deleteEleccion(id);
        res.status(HttpStatus.ACCEPTED).json(result);
    }

}
