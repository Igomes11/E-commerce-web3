import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produto } from "../../produtos/entities/produto.entity";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    nome: string;

    @OneToMany(() => Produto, (produto) => produto.categoria)
    produtos: Produto[];
}
