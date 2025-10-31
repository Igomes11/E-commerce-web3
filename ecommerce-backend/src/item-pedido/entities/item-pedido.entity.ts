import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity'; // Caminho Corrigido
import { Produto } from '../../produto/entities/produto.entity';

@Entity('item_pedido')
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantidade: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precoVenda: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  // N:1 com Pedido
  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;

  // N:1 com Produto (CORRIGE: usa itensPedido)
  @ManyToOne(() => Produto, (produto) => produto.itensPedido)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;
}