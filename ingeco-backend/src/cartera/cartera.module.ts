import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { CarteraController } from './cartera.controller';
import { CarteraService } from './cartera.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarteraEntity } from './cartera.entity';
import { ReciboHonorarioEntity } from 'src/recibohonorario/recibohonorario.entity';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CarteraEntity]), ReciboHonorarioEntity],
  controllers: [CarteraController],
  providers: [CarteraService],
  exports: [CarteraService, CarteraModule]
})
export class CarteraModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(CarteraController); }  
}
