import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EleccionEntity } from './eleccion.entity';
import { Repository } from 'typeorm';
import { BancoEntity } from 'src/banco/banco.entity';
import { EmpleadoEntity } from 'src/empleado/empleado.entity';

@Injectable()
export class EleccionService {
    constructor(
        @InjectRepository(EleccionEntity)
        private eleccionRepository: Repository<EleccionEntity>,
        @InjectRepository(BancoEntity)
        private bancoRepository: Repository<BancoEntity>,
        @InjectRepository(EmpleadoEntity)
        private empleadoRepository: Repository<EmpleadoEntity>,        
    ){}

    public async getAllEleccion(){
        return await this.eleccionRepository.find();
    }

    public async getEleccionByEmpleado(empleadoid: number){
        let res = await this.eleccionRepository.find({where: {empleado: empleadoid}, relations: ["banco", "empleado"]});
        console.log(res.length);
        return res;
    }

    public async createEleccion(newEleccion: EleccionEntity, bancoid, empleadoid)
    {
        let res;
        let err;        
        let today = new Date();       

        try{

            let banco = await this.bancoRepository.findOne({id:bancoid});
            let empleado = await this.empleadoRepository.findOne({id:empleadoid});
            if (empleado == null){throw 'empleado inexistente';}
            if (banco == null){throw 'banco inexistente';}  
            newEleccion.empleado = empleado;
            newEleccion.banco = banco;
            res = await this.eleccionRepository.insert(newEleccion);
        }catch (error) {
            console.log(error);
            err = error;                 
        }   

        return (
            err || {
                message: 'Created',
                created: true,
                id: newEleccion.id,
                empleadoid: newEleccion.empleado.id,
                bancoid: newEleccion.banco.id,
            }
        );
    }

    public async editEleccion(edE: EleccionEntity, id)
    {
        let res;
        let err;
        let rh = await this.eleccionRepository.findOne({id:id});
        var dateFormat = require('dateformat');
        try {
            if (rh == null) {throw 'La eleccion no existe';}     
            res = await this.eleccionRepository.update(rh,edE);
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

    public async deleteEleccion(id)
    {
        let res;
        let err;
        let rh = await this.eleccionRepository.findOne({id:id});
        try {
            if (rh != null)
            {
                res = await this.eleccionRepository.delete(rh);
                console.log(res);
            }
            else{
                throw "La eleccion no existe.";
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
