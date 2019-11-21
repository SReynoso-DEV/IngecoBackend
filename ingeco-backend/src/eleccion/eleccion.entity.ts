import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { BancoEntity } from "../banco/banco.entity";
import { EmpleadoEntity } from "../empleado/empleado.entity";

@Entity('eleccion')
export class EleccionEntity {
    @PrimaryGeneratedColumn()
    id : number

    @ManyToOne(type => BancoEntity, banco => banco.eleccionBanco, {onDelete: 'CASCADE'})
    banco : BancoEntity
    
    @ManyToOne(type => EmpleadoEntity, empleado => empleado.eleccionEmpleado, {onDelete: 'CASCADE'})
    empleado: EmpleadoEntity
    
    @Column()
    tiempo: number

    @Column({type:'datetime'})
    fechaInicio: Date

    @Column({type: 'decimal' , precision: 8, scale: 2, default: 0})
    stock: number

    @Column({type: 'decimal' , precision: 6, scale: 2})
    capital: number

    @Column({type: 'decimal' , precision: 10, scale: 7, default: 0})
    trea: number

}