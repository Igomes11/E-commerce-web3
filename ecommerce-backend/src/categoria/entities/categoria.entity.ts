import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity'; // Importa Produto

@Entity('categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  nome: string;

  // Relacionamento 1:N com Produto
  // Mapeia o array de produtos que pertencem a esta categoria
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
