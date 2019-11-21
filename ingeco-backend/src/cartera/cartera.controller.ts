import { Controller, Get, Res, HttpStatus, Req, Param, Post, Delete } from '@nestjs/common';
import { CarteraService } from './cartera.service';

@Controller('cartera')
export class CarteraController {
    constructor(private carteraService: CarteraService){}

    @Get()
    public async getAllCartera(@Res() res, @Req() req){
        const rh = await this.carteraService.getAllCartera();
        console.log(req.payload);
        res.status(HttpStatus.OK).json(rh);
    }

    @Get(':id')
    public async getCartera(@Res() res, @Param('id') id){
        const cartera = await this.carteraService.getCartera(id);
        res.status(HttpStatus.OK).json(cartera);
    }

    @Delete(':id')
    public async deleteCartera(@Res() res, @Param('id') id){
        const result = await this.carteraService.deleteCartera(id);
        res.status(HttpStatus.ACCEPTED).json(result);
    }
}
