import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarteraEntity } from './cartera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarteraService {
    constructor(
        @InjectRepository(CarteraEntity)
        private carteraRepository: Repository<CarteraEntity>
    ){}

    public async getAllCartera(){
        return await this.carteraRepository.find();
    }

    public async getCartera(id: number){
        return await this.carteraRepository.find({id:id});
    }

    public async createCartera(newCartera : CarteraEntity){
        let res;
        let err;
        try {
            let cartera = await this.getCartera(newCartera.id);
            if (cartera == null) {res = await this.carteraRepository.insert(newCartera);}            
        } catch (error) {
            console.log(error);
            err = error;     
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: newCartera.id
            }
        );
    }

    public async updateCartera(editCartera : CarteraEntity, id: number){
        let res;
        let err;
        let rh = await this.carteraRepository.findOne({id:id});
        try {
            if (rh == null) {throw 'la cartera no existe';}
            res = await this.carteraRepository.update(rh, editCartera);
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

        );
    }

    public async deleteCartera(id: number){
        let res;
        let err;
        let rh = await this.carteraRepository.findOne({id:id});

        try {
            if (rh != null) {
                res = await this.carteraRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "La cartera no existe.";
                
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

    








}
