import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TasaController } from './tasa.controller';
import { TasaService } from './tasa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasaEntity } from './tasa.entity';
import { BancoModule } from 'src/banco/banco.module';
import { AuthMiddleware } from '../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([TasaEntity]), BancoModule],
  controllers: [TasaController],
  providers: [TasaService],
  exports: [TasaService, TasaModule]
})
export class TasaModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(TasaController); }


}
