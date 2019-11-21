import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EleccionController } from './eleccion.controller';
import { EleccionService } from './eleccion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EleccionEntity } from './eleccion.entity';
import { BancoEntity } from '../banco/banco.entity';
import { EmpleadoEntity } from '../empleado/empleado.entity';
import { BancoController } from '../banco/banco.controller';
import { EmpleadoController } from '../empleado/empleado.controller';
import { BancoService } from '../banco/banco.service';
import { EmpleadoService } from '../empleado/empleado.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { TasaEntity } from '../tasa/tasa.entity';
import { TasaController } from '../tasa/tasa.controller';
import { TasaService } from '../tasa/tasa.service';

@Module({
  imports: [TypeOrmModule.forFeature([EleccionEntity,BancoEntity, EmpleadoEntity, TasaEntity])],
  controllers: [EleccionController, BancoController, EmpleadoController, TasaController],
  providers: [EleccionService,BancoService, EmpleadoService, TasaService],
  exports: [EleccionService,BancoService, EmpleadoService, TasaService, EleccionModule]
})
export class EleccionModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EleccionController);
  }


}
