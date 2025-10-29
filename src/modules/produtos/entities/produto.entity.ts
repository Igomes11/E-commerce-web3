import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from "typeorm";
import { Categoria } from "../../categorias/entities/categoria.entity";

@Entity()
export class Produto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ type: 'text' , nullable: true })
    descricao: string;

    @Column('decimal', { precision: 10, scale: 2 })
    preco: number;

    @Column('int', { default: 0 })
    estoque: number;

    @Column({default: true})
    ativo: boolean;

    @ManyToOne(() => Categoria, (categoria) => categoria.produtos, { eager: true })
    categoria: Categoria;
}
