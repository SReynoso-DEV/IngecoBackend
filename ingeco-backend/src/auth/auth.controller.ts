import { Controller, Res, Post, Body, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';
import { SignUpService } from './signup.service';
import { EvalSourceMapDevToolPlugin } from 'webpack';
import { EmpleadoEntity } from '../empleado/empleado.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private loginService: LoginService,
        private signupService: SignUpService
    ){}

    @Post('/login')
    public async login(@Res() res, @Body('email') email, @Body('password') password){
        console.log("trying ? ")
        const auth = await this.loginService.login(email, password);
        res.status(HttpStatus.OK).json(auth);
    }

    @Post('/signup')
    public async signup(@Res() res, @Body() newEmpleado : EmpleadoEntity) {
        const auth = await this.signupService.signup(newEmpleado);
        res.status(HttpStatus.OK).json(auth);
    }


}
