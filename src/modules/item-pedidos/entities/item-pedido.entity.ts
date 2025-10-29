
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity()
export class ItemPedido {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Pedido, (pedido) => pedido.itens)
  pedido: Pedido;

  @ManyToOne(() => Produto)
  produto: Produto;

  @Column('int')
  quantidade: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;
}


