import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BancoEntity } from './banco.entity';
import { TasaEntity } from '../tasa/tasa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BancoService {
    constructor(
        @InjectRepository(BancoEntity)
        private bancoRepository: Repository<BancoEntity>,
        @InjectRepository(TasaEntity)
        private tasaRepository: Repository<TasaEntity>,
    ){}

    public async getAllBanco()
    {
        return await this.bancoRepository.find({relations: ["tasa"]});
    }

    public async getBancoByID(id: number){
        return await this.bancoRepository.findOne({where: {id:id}, relations: ["tasa"]});
    }

    public async deleteBanco(id: number){
        let res;
        let err;
        let rh = await this.bancoRepository.findOne({id:id});
        var dateFormat = require('dateformat');
        try {
            if (rh == null) {throw 'El Recibo por honorario no existe';}     
            res = await this.bancoRepository.delete(rh);
        } catch (error) {
            err = error;
            console.log(err);
            throw err;
        }

        return (
            err || {
                message: 'Deleted',
                Deleted: true,
                id: id,
            }

        )
    }

    public async editBanco(editedBanco: BancoEntity, id: number){
        let res;
        let err;
        let rh = await this.bancoRepository.findOne({id:id});
        var dateFormat = require('dateformat');
        try {
            if (rh == null) {throw 'El Recibo por honorario no existe';}     
            res = await this.bancoRepository.update(rh,editedBanco);
        } catch (error) {
            err = error;
            console.log(err);
            throw err;
        }

        return (
            err || {
                message: 'Updated',
                Updated: true,
                id: res.id,
            }

        )
    }

    public async createBanco(newBanco: BancoEntity, tasaid)
    {
        let res;
        let err;
        let today = new Date();

        try{
            let tasa = await this.tasaRepository.findOne({id: tasaid});
            if (tasa == null) {throw 'tasa inexistente';}
            newBanco.tasa = tasa;
            res = await this.bancoRepository.insert(newBanco); 
        }catch(error){
            console.log(error);
            err = error;
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: newBanco.id,
                userid: newBanco.tasa.id,
            }
        );
    }
}
