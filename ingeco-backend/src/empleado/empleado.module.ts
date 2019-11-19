import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { EmpleadoController } from './empleado.controller';
import { EmpleadoService } from './empleado.service';
import { EmpleadoEntity } from "./empleado.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthMiddleware } from './../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([EmpleadoEntity])],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
  exports: [EmpleadoService]
})
export class EmpleadoModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EmpleadoController);
  }
}
