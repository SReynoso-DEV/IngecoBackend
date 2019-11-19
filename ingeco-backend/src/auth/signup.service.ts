import { HttpException, Injectable, BadRequestException } from '@nestjs/common';
import { EmpleadoService } from '../empleado/empleado.service';
import { AuthHelper } from './auth.helper';
import { EmpleadoEntity } from '../empleado/empleado.entity';
let key = process.env.KEY||'dsaadsadsadsafsads2adsa';
 
// Create an encryptor:
let encryptor = require('simple-encryptor')(key);
@Injectable()
export class SignUpService {
    constructor(private empleadoService:EmpleadoService, private authHelper:AuthHelper){
    }

/*******************************************************
 * SignUp user account
 *******************************************************/
  public async signup(newEmpleado: EmpleadoEntity){
    let res = await this.empleadoService.createEmpleado(newEmpleado)
    if(res.registered){      
      return this.authHelper.genToken(newEmpleado)
    }
    else{
      throw new BadRequestException({error:"Incorrect signup data", reason:res})
    }
  }

}