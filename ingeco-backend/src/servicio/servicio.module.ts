import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ServicioService } from './servicio.service';
import { ServicioController } from './servicio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioEntity } from './servicio.entity';
import { RecibohonorarioModule } from '../recibohonorario/recibohonorario.module';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([ServicioEntity]),RecibohonorarioModule],
  providers: [ServicioService],
  controllers: [ServicioController],
  exports: [ServicioService]
})
export class ServicioModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(ServicioController);
  }

}
