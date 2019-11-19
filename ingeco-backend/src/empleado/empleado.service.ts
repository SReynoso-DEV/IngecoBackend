import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { EmpleadoEntity } from "./empleado.entity";
import { Repository } from "typeorm";

@Injectable()
export class EmpleadoService {
    constructor(
        @InjectRepository(EmpleadoEntity)
        private empleadoRepository: Repository<EmpleadoEntity>,
    ){
        console.log('Ready');
        console.log(this.empleadoRepository.find());
      }

    public async getAllEmpleados(){
        return await this.empleadoRepository.find();
    }


    public async getEmpleado(value: any){
        console.log("looking", value)
        let res = await this.empleadoRepository.find({username : value});
        return res;
    }

    public async getEmpleadoLogin(value: any){
        console.log("looking",value)
        let res = await this.empleadoRepository.find({
          where: { email: value },
        });
        return res;
    }
    public async createEmpleado(newEmpleado: EmpleadoEntity) {
        let res;
        let err;
        let users = await this.empleadoRepository.find({ dni: newEmpleado.dni });
        let emails = await this.empleadoRepository.find({ email: newEmpleado.email });
        try { 
          if (users.length > 0) {
            throw 'Ya existe un empleado registrado con este DNI';
          }
          if (emails.length > 0) {
            throw 'Email en uso';
          }
          res = await this.empleadoRepository.insert(newEmpleado);
          // console.log(res);
        } catch (e) {
          console.log(e);
          err = e;
        }
        console.log('Err', err);
        return (
          err || {
            message: 'Registrado',
            registered: true,
            id: res.identifiers[0].id,
          }
        );
      }

      public async editEmpleado(editedEmpleado: EmpleadoEntity){}
      public async deleteEmpleado(id: any){}






}
