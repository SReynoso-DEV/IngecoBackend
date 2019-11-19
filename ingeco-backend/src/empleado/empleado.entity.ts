import {  } from "@nestjs/typeorm";
import { Entity,PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ReciboHonorarioEntity } from "src/recibohonorario/recibohonorario.entity";

@Entity('empleado')
export class EmpleadoEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    dni: number;

    @Column()
    ruc: string;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    telefono: number;

    @Column()
    domicilio: string;

    @OneToMany(type => ReciboHonorarioEntity, empleadoRH => empleadoRH.empleado)
    empleadoRH : EmpleadoEntity[];

}