import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BancoController } from './banco.controller';
import { BancoService } from './banco.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BancoEntity } from './banco.entity';
import { TasaEntity } from 'src/tasa/tasa.entity';
import { EleccionModule } from 'src/eleccion/eleccion.module';
import { TasaController } from 'src/tasa/tasa.controller';
import { TasaService } from 'src/tasa/tasa.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([BancoEntity, TasaEntity]), EleccionModule],
  controllers: [BancoController, TasaController],
  providers: [BancoService, TasaService],
  exports: [BancoService, TasaService, BancoModule]
})
export class BancoModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(BancoController);
  }  


}
