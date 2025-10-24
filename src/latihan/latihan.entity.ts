import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Latihan extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    name: string;
    @Column()
    alamat: string;
    @Column()
    umur: number;
   
    @Column({
        nullable: true,
    })
    updated_at: string;
}
