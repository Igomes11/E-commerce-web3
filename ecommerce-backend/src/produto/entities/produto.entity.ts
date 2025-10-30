import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ default: 0 })
  estoque: number; // Regra: Estoque é debitado após o pagamento.

  @Column({ default: 'placeholder.png' })
  imagem: string;

  @Column({ default: true })
  statusAtivo: boolean; // Regra: Produto inativo não pode ser adicionado a pedidos.

  // Relacionamento N:1 com Categoria
  @ManyToOne(() => Categoria, (categoria) => categoria.produtos)
  @JoinColumn({ name: 'categoria_id' }) // Coluna FK no banco
  categoria: Categoria;
  
  @Column({ name: 'categoria_id' })
  categoriaId: number; // Chave estrangeira
}
