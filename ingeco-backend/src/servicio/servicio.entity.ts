import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { ReciboHonorarioEntity } from "../recibohonorario/recibohonorario.entity";

@Entity('servicio')
export class ServicioEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    descripcion: string

    @OneToMany(type=>ReciboHonorarioEntity, servicioRH => servicioRH.servicio)
    servicioRH : ReciboHonorarioEntity[];

}