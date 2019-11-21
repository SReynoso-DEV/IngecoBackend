import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EleccionEntity } from './eleccion.entity';
import { Repository } from 'typeorm';
import { BancoEntity } from '../banco/banco.entity';
import { EmpleadoEntity } from '../empleado/empleado.entity';

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

    public VAN(tasa:number, flujos){
        let VA = 0;
        for (let i = 0; i < flujos.length; i++) {
            VA = VA + flujos[i]/((1+tasa)**i);            
        }

        return VA;
    }

    public TIR(flujos){
        let kb = 0;
        let ka=-.5;
        let kc=10 ;
        let inf=this.VAN(ka,flujos); 
        let sup=this.VAN(kc,flujos) 
        if (inf>=0 && sup <0){
            let error = Math.abs(inf-sup);
            while (error>=1*(10**-10)){
                let kb = (ka+kc)/2;
                let med = this.VAN(kb,flujos);
                if (med <= 0){
                    kc = kb;
                }
                else if(med>0){
                    ka = kb;
                }
                inf = this.VAN(ka,flujos);
                sup = this.VAN(kc,flujos);
                let error = inf-sup;               
            }
            return kb;
        }
        else{
            return -1;
        }
    }

    public TNPaTREA(capital:number, TNominal:number, TCapitalizacion:number, TAfecto:number, Comision:number, TNP:number){
        let m :number= TNominal/TCapitalizacion;
        let n :number= TAfecto/TCapitalizacion;
        let mes0 :number= -capital;
        let tea :number= ((1+(TNP/m))**(n)-1);
        let tem :number= ((1+tea)**(1/12)-1);

        let interesxmes:number = capital*tem;
        let mes1 :number= capital+interesxmes-Comision;
        let fa = [mes0,mes1];
        let trem:number = this.TIR(fa);
        let trea :number= (1+trem)**(12)-1;

        let stock:number = capital + (capital*trea);
        let resultados = [trea,stock];

        return resultados;
    }

    public TEAaTREA(capital:number, tea:number, comision:number){
        let mes0:number= -capital;
        let tem:number = (1+tea)**(1/12)-1;
        let interesxmes:number = capital*tem;
        let mes1:number = capital+interesxmes - comision;
        let fa = [mes0, mes1];
        let trem:number = this.TIR(fa);
        let trea:number = (1+trem)**(12)-1;
        let stock:number = capital + (capital*trea);
        let resultados = [trea,stock];

        return resultados;
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

    public async calcular(eleccion: EleccionEntity, eid:number){
        let res;
        console.log("entre");
        
        let err;
        let el = await this.eleccionRepository.findOne({where: {id:eid}, relations: ["banco", "empleado", "banco.tasa"]});
        console.log(el);
        try {
            console.log("entre");
     
        if (el.banco.tasa.tcapitalizacion != 0){
            
            let resultados = this.TNPaTREA(el.capital,el.banco.tasa.tnominal,el.banco.tasa.tcapitalizacion,el.tiempo,el.banco.comision,el.banco.tasa.porcentaje);
            eleccion.trea = resultados[0];
            console.log(resultados);
            eleccion.stock = resultados[1];
        }
        if (el.banco.tasa.tcapitalizacion == 0){
            let resultados = this.TEAaTREA(el.capital,el.banco.tasa.porcentaje,el.banco.comision);
            eleccion.trea = resultados[0];
            eleccion.stock = resultados[1];
        }
        
        res = await this.eleccionRepository.update(el,eleccion);

    } catch (error) {
        console.log(error);
        err = error;                 
    }   

    return (
        err || {
            message: 'Calculado',
            calculado: true
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
