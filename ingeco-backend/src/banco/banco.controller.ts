import { Controller, Get, Res, HttpStatus, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BancoService } from './banco.service';
import { BancoEntity } from './banco.entity';

@Controller('banco')
export class BancoController {
    constructor(private bancoService: BancoService){}

    @Get()
    public async getAllBanco(@Res() res){
        const banco = await this.bancoService.getAllBanco();
        res.status(HttpStatus.OK).json(banco);
    }

    @Get(':id')
    public async getBanco(@Res() res , @Param('id') id){
        const banco = await this.bancoService.getBancoByID(id);
        res.status(HttpStatus.OK).json(banco);
    }

    @Delete(':id')
    public async deleteBanco(@Res() res, @Param('id') id){
        const banco = await this.bancoService.deleteBanco(id);
        res.status(HttpStatus.OK).json(banco);
        
    }

    @Put(':id')
    public async updateBanco(@Res() res, @Body() eb : BancoEntity, @Param('id') id){
        const banco = await this.bancoService.editBanco(eb,id);
        res.status(HttpStatus.ACCEPTED).json(banco);
    }
    

    @Post()
    public async createBanco(@Res() res, @Body() newBanco: any, @Body('tasaid') tasaid){
        const result = await this.bancoService.createBanco(newBanco, tasaid);
        res.status(HttpStatus.CREATED).json(result);
    }

}
