import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TasaEntity } from './tasa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasaService {
    constructor(
        @InjectRepository(TasaEntity)
        private tasaRepository: Repository<TasaEntity>,

    ){}

    public async getAllTasas()
    {
        return await this.tasaRepository.find();
    }

    public async getTasaByID(id: number)
    {
        let res = await this.tasaRepository.findOne({id : id});
        if (res == null){
            throw 'Servicio doesnt exist';
        }

        return res;
    }

  
    public async deleteTasa(id: number){
        let res;
        let err;
        let rh = await this.tasaRepository.findOne({id:id});

        try {
            if (rh != null) {
                res = await this.tasaRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "La tasa por honorario no existe.";
                
            }
        } catch (error) {
            err = error;
            console.log(err);
            throw err;            
        }

        return (
            err || {
                message: "Eliminated",
                Eliminated: true,
                id: id,
            }
        );
        
    }

    public async createTasa(newTasa : TasaEntity)
    {
        let res;
        let err;
        let uc;
        let servicio = await this.tasaRepository.find({id : newTasa.id});
        try{
            if (servicio.length > 0){
                throw 'Servicio ya existente'
            }

            res = await this.tasaRepository.insert(newTasa);
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
