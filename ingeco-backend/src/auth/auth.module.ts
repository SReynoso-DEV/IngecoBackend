import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmpleadoModule } from '../empleado/empleado.module';
import { LoginService } from './login.service';
import { AuthHelper } from './auth.helper';
import { SignUpService } from './signup.service';
import { ServicioModule } from '../servicio/servicio.module';
import { RecibohonorarioModule } from 'src/recibohonorario/recibohonorario.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LoginService, SignUpService, AuthHelper],
  imports: [EmpleadoModule, ServicioModule, RecibohonorarioModule]
})
export class AuthModule {}
