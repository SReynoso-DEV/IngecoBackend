import { PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, Entity, OneToOne, OneToMany } from "typeorm";
import { TasaEntity } from "../tasa/tasa.entity"
import { EleccionEntity } from "../eleccion/eleccion.entity";

@Entity('banco')
export class BancoEntity{
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    nombre: string

    @Column()
    telefono: number

    @Column()
    contacto: string

    @Column({type: 'decimal', precision: 10, scale: 7})
    ctea: number

    @Column({type: 'decimal', precision: 6, scale: 2})
    costeini: number

    @Column({type: 'decimal', precision: 6, scale: 2})
    costefin: number


    @ManyToOne(type=>TasaEntity, tasa => tasa.tasaBanco, {onDelete: 'CASCADE'})
    tasa: TasaEntity;

    @OneToMany(type => EleccionEntity, eleccionBanco => eleccionBanco.banco)
    eleccionBanco : EleccionEntity[];
}