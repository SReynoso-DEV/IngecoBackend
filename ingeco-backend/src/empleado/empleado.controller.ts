import { Controller, Res, HttpStatus, Get, Req, Post, Body } from '@nestjs/common';
import { EmpleadoService } from "./empleado.service";
import { EmpleadoEntity } from './empleado.entity';

@Controller('empleado')
export class EmpleadoController {
    constructor(private empleadoService: EmpleadoService){}

    @Get()
    public async getAllUsers(@Res() res) {
      console.log('empleados');
      const users = await this.empleadoService.getAllEmpleados();
      res.status(HttpStatus.OK).json(users);
    }

    @Get('/afterLogin')
    public async getUserInfo(@Res()res ,@Req() req){
      console.log("req!", req.payload)
      const user = await this.empleadoService.getEmpleado(req.payload.username);
      res.status(HttpStatus.OK).json({user:user[0]});
    }  

    @Post() 
    public async createEmpleado(@Res() res, @Body() newEmpleado : EmpleadoEntity){
        const result = await this.empleadoService.createEmpleado(newEmpleado);
        res.status(HttpStatus.CREATED).json(result);


    }






}
