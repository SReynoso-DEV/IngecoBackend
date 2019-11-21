import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpleadoEntity } from '../empleado/empleado.entity';
import { Repository } from 'typeorm';
import { ServicioEntity } from '../servicio/servicio.entity';
import { ReciboHonorarioEntity } from './recibohonorario.entity';
import { regExpLiteral } from '@babel/types';
import { CarteraEntity } from 'src/cartera/cartera.entity';

@Injectable()
export class RecibohonorarioService {

    constructor(
        @InjectRepository(EmpleadoEntity)
        private empleadoRepository: Repository<EmpleadoEntity>,
        @InjectRepository(ServicioEntity)
        private servicioRepository: Repository<ServicioEntity>,
        @InjectRepository(ReciboHonorarioEntity)
        private reciboHonorarioRepository: Repository<ReciboHonorarioEntity>,   
        @InjectRepository(CarteraEntity)
        private carteraRepository: Repository<CarteraEntity>,    
    ){}

    public async getAllRH()
    {
        return await this.reciboHonorarioRepository.find({relations: ["empleado", "servicio", "cartera"]});
    }

    public async getRHbyEmpleado(empleadoID: any)
    {
        let res = await this.reciboHonorarioRepository.find({where: {empleado : empleadoID}, relations: ["empleado", "servicio", "cartera"]});
        console.log(res.length);
        return res;
    }

    public async createRH(NewRH : ReciboHonorarioEntity, empleadoid, servicioid, carteraid)
    {
        let res;
        let newCartera = new CarteraEntity();
        let asd;
        let err;
        var dateFormat = require('dateformat');
        let today = new Date();
        

        try{

            let servicio = await this.servicioRepository.findOne({id:empleadoid});
            let empleado = await this.empleadoRepository.findOne({id:servicioid});
            let cartera = await this.carteraRepository.findOne({id:carteraid});
            if (empleado == null){throw 'empleado inexistente';}
            if (servicio == null){throw 'servicio inexistente';}
            if (cartera == null){
                newCartera.id = carteraid;
                asd = await this.carteraRepository.insert(newCartera);                
            }

            if (NewRH.submonto < 100) {throw 'el monto minimo por recibo por honorario es 100';}
            NewRH.empleado = empleado;
            NewRH.servicio = servicio;
            NewRH.cartera = cartera;

            
            if (NewRH.submonto > 1500)
            {
                NewRH.retencion = NewRH.submonto * 0.18;                
            }
            else
            {
                NewRH.retencion = 0;
            }
            NewRH.total = NewRH.submonto + NewRH.retencion;
            res = await this.reciboHonorarioRepository.insert(NewRH);
        }catch (error) {
            console.log(error);
            err = error;                 
        }

        return (
            err || {
                message: 'Created',
                created: true,
                id: NewRH.id,
                userid: NewRH.servicio.id,
                commandid: NewRH.empleado.id,
            }
        );

    }

    public async editRH(editedRH : ReciboHonorarioEntity, id)
    {
        let res;
        let err;
        let rh = await this.reciboHonorarioRepository.findOne({id:id});
        var dateFormat = require('dateformat');
        try {
            if (rh == null) {throw 'El Recibo por honorario no existe';}
            if (editedRH.fechaPago != null) {editedRH.estado = "Pagado";}  
            if (editedRH.fechaPago == null) {editedRH.estado = "Por validar";}          
            res = await this.reciboHonorarioRepository.update(rh,editedRH);
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

    public async deleteRH(id)
    {
        let res;
        let err;
        let rh = await this.reciboHonorarioRepository.findOne({id:id});

        try {
            if (rh != null) {
                res = await this.reciboHonorarioRepository.delete({id:id});
                console.log(res);                
            } else {
                throw "El Recibo por honorario no existe.";
                
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
