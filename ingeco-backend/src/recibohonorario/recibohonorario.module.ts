import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RecibohonorarioController } from './recibohonorario.controller';
import { RecibohonorarioService } from './recibohonorario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReciboHonorarioEntity } from './recibohonorario.entity';
import { ServicioEntity } from '../servicio/servicio.entity';
import { EmpleadoEntity } from '../empleado/empleado.entity';
import { ServicioController } from '../servicio/servicio.controller';
import { EmpleadoController } from '../empleado/empleado.controller';
import { ServicioService } from '../servicio/servicio.service';
import { EmpleadoService } from '../empleado/empleado.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([ReciboHonorarioEntity, ServicioEntity, EmpleadoEntity])],
  controllers: [RecibohonorarioController,ServicioController, EmpleadoController],
  providers: [RecibohonorarioService,ServicioService, EmpleadoService],
  exports: [RecibohonorarioService,ServicioService, EmpleadoService, RecibohonorarioModule]
})
export class RecibohonorarioModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(RecibohonorarioController);
  }
}
