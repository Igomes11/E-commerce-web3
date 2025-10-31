import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { ItemPedido } from '../../item-pedidos/entities/item-pedido.entity';
import { Pagamento } from '../../pagamentos/entities/pagamento.entity';


@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @OneToMany(() => ItemPedido, (item) => item.pedido, { cascade: true })
  itens: ItemPedido[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ default: 'AGUARDANDO_PAGAMENTO' })
  status: string;

  @CreateDateColumn()
  criadoEm: Date;

  @OneToMany(() => Pagamento, pagamento => pagamento.pedido)
  pagamentos: Pagamento[];
}

