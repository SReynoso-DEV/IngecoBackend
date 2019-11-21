import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioEntity } from './servicio.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServicioService {
    constructor(
        @InjectRepository(ServicioEntity)
        private servicioRepository: Repository<ServicioEntity>,
    ){}

    public async getAllServicio()
    {
        return await this.servicioRepository.find();
    }

    public async getServicioByID(id: number)
    {
        let res = await this.servicioRepository.findOne({id : id});
        if (res == null){
            throw 'Servicio doesnt exist';
        }
    }

    public async createServicio(NewServicio : ServicioEntity)
    {
        let res;
        let err;
        let uc;
        let servicio = await this.servicioRepository.find({nombre : NewServicio.nombre});
        try{
            if (servicio.length > 0){
                throw 'Servicio ya existente'
            }

            res = await this.servicioRepository.insert(NewServicio);
        } catch(error){
            console.log(error);
            err = error;
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: res.identifiers[0].id,
            }
        )
    }


}
