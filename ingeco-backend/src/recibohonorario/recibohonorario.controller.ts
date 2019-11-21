import { Controller, Get, Res, HttpStatus, Req, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { RecibohonorarioService } from './recibohonorario.service';
import { ReciboHonorarioEntity } from './recibohonorario.entity';

@Controller('recibohonorario')
export class RecibohonorarioController {
    constructor(private reciboHonorarioService: RecibohonorarioService){}

    @Get()
    public async getAllRH(@Res() res, @Req() req){
        const rh = await this.reciboHonorarioService.getAllRH();
        console.log(req.payload);
        res.status(HttpStatus.OK).json(rh);
    }

    @Get(':empleadoid')
    public async getRHbyEID(@Res() res, @Param('empleadoid') empleadoid){
        const rh = await this.reciboHonorarioService.getRHbyEmpleado(empleadoid);
        res.status(HttpStatus.OK).json(rh);
    }

    @Post()
    public async createRH(@Res() res, @Body() newRH : any, @Body('empleadoid') empleadoid, @Body('servicioid') servicioid, @Req() req){
        const result = await this.reciboHonorarioService.createRH(newRH, empleadoid, servicioid,req.payload.id);
        res.status(HttpStatus.CREATED).json(result);
    }

    @Put(':id')
    public async updateRH(@Res() res, @Body() rh : ReciboHonorarioEntity, @Param('id') id)
    {
        const result = await this.reciboHonorarioService.editRH(rh,id);
        res.status(HttpStatus.ACCEPTED).json(result);
    }
    
    @Delete(':id')
    public async deleteRH(@Res() res, @Param('id') id){
        const result = await this.reciboHonorarioService.deleteRH(id);
        res.status(HttpStatus.ACCEPTED).json(result);
    }









}
