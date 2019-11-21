import { PrimaryGeneratedColumn, Column, OneToMany, PrimaryColumn, Entity } from "typeorm";
import { ReciboHonorarioEntity } from "../recibohonorario/recibohonorario.entity";

@Entity('cartera')
export class CarteraEntity {
    @PrimaryColumn()
    id: number

    @Column({type: 'decimal', precision: 10, scale: 7, nullable: true})
    carteratcea: number

    @Column({type: 'decimal', precision: 6, scale: 2, nullable: true})
    vrecibido: number

    @OneToMany(type=>ReciboHonorarioEntity, carteraRH => carteraRH.cartera)
    carteraRH : ReciboHonorarioEntity[]
}