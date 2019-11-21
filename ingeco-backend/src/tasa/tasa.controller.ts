import { Controller, Get, Res, HttpStatus, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { TasaService } from './tasa.service';
import { TasaEntity } from './tasa.entity';

@Controller('tasa')
export class TasaController {
    constructor(private tasaService: TasaService){}

    @Get()
    public async getAllTasa(@Res() res){
        const tasa = await this.tasaService.getAllTasas();
        res.status(HttpStatus.OK).json(tasa);
    }

    @Delete(':id')
    public async deleteTasa(@Res() res, @Param('id') id)
    {
        const tasa = await this.tasaService.deleteTasa(id);
        res.status(HttpStatus.OK).json(tasa);
    }

    @Get(':id')
    public async getTasa(@Res() res, @Param('id') id){
        const tasa = await this.tasaService.getTasaByID(id);
        res.status(HttpStatus.OK).json(tasa);
    }

    @Put(':id')
    public async updateTasa(@Res() res, @Body() upT : TasaEntity, @Param('id') id){
        const tasa = await this.tasaService.updateTasa(upT, id);
        res.status(HttpStatus.OK).json(tasa);
    }

    @Post()
    public async createTasa(@Res() res, @Body() newTasa: TasaEntity){
        const result = await this.tasaService.createTasa(newTasa);
        res.status(HttpStatus.CREATED).json(result);
    }
}
