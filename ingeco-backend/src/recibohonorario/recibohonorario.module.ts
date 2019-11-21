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
import { CarteraEntity } from '../cartera/cartera.entity';
import { CarteraController } from '../cartera/cartera.controller';
import { CarteraService } from '../cartera/cartera.service';
import { CarteraModule } from '../cartera/cartera.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReciboHonorarioEntity, ServicioEntity, EmpleadoEntity, CarteraEntity]), CarteraModule],
  controllers: [RecibohonorarioController,ServicioController, EmpleadoController, CarteraController],
  providers: [RecibohonorarioService,ServicioService, EmpleadoService, CarteraService],
  exports: [RecibohonorarioService,ServicioService, EmpleadoService, RecibohonorarioModule, CarteraModule
  ]
})
export class RecibohonorarioModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(RecibohonorarioController);
  }
}
