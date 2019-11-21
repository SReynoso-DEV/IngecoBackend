import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { BancoEntity } from "src/banco/banco.entity";

@Entity('tasa')
export class TasaEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tipo: string

    @Column({nullable: true})
    capitalizacion: string

    @Column({type: "decimal", precision: 10, scale: 7})
    porcentaje : number

    @OneToMany(type => BancoEntity, tasaBanco => tasaBanco.tasa)
    tasaBanco: BancoEntity[];

}