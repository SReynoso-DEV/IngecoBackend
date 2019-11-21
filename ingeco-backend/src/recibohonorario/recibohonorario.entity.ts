import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import { EmpleadoEntity } from "../empleado/empleado.entity";
import { ServicioEntity } from "../servicio/servicio.entity";

@Entity('recibohonorario')
export class ReciboHonorarioEntity {

    @PrimaryGeneratedColumn()
    id : number

    @Column('datetime')
    fechaEmision : Date

    @Column({type: "float"})
    submonto : number

    @Column({type: "float", default: 0})
    retencion : number

    @Column({default: "soles"})
    moneda : string

    @Column({type: "float", default: 0})
    total : number

    @Column({default: "Por Validar"})
    estado : string

    @Column({type : "datetime", nullable: true})
    fechaPago : Date

    @Column({type: 'decimal', precision: 10, scale: 7, default: 0})
    tcea: number

    @Column({type : "datetime", nullable: true})
    fechaDescuento : Date

    @Column({type: 'decimal', precision: 6, scale: 2, default: 0})
    montodesc: number

    @ManyToOne(type => EmpleadoEntity, empleado => empleado.empleadoRH, {onDelete: 'CASCADE'})
    empleado : EmpleadoEntity;

    @ManyToOne(type => ServicioEntity, servicio => servicio.servicioRH, {onDelete: 'CASCADE'})
    servicio : ServicioEntity;
}