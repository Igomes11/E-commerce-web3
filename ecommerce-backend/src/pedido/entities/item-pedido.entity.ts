import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';
import { Produto } from '../../produto/entities/produto.entity';

@Entity('item_pedido')
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precoVenda: number; // Preço do produto no momento da venda (para histórico)

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number; // quantidade * precoVenda

  // --- RELACIONAMENTOS ---

  // N:1 com Pedido
  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  // N:1 com Produto
  @ManyToOne(() => Produto, (produto) => produto.itensPedido)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;
}
