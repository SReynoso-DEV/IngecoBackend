import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EleccionController } from './eleccion.controller';
import { EleccionService } from './eleccion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EleccionEntity } from './eleccion.entity';
import { BancoEntity } from 'src/banco/banco.entity';
import { EmpleadoEntity } from 'src/empleado/empleado.entity';
import { BancoController } from 'src/banco/banco.controller';
import { EmpleadoController } from 'src/empleado/empleado.controller';
import { BancoService } from 'src/banco/banco.service';
import { EmpleadoService } from 'src/empleado/empleado.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { TasaEntity } from 'src/tasa/tasa.entity';
import { TasaController } from 'src/tasa/tasa.controller';
import { TasaService } from 'src/tasa/tasa.service';

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
