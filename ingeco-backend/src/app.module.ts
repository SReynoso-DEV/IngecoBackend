import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadoModule } from './empleado/empleado.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AuthModule } from './auth/auth.module';
import { TasaModule } from './tasa/tasa.module';
import { EleccionModule } from './eleccion/eleccion.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

    constructor(private readonly connection: Connection){}
}
