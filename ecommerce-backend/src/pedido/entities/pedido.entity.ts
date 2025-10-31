import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Endereco } from '../../endereco/entities/endereco.entity';
import { ItemPedido } from '../../item-pedido/entities/item-pedido.entity'; // Caminho Corrigido

// Enum para os status do pedido
export enum PedidoStatus {
  ABERTO = 'ABERTO',
  AGUARDANDO_PAGAMENTO = 'AGUARDANDO_PAGAMENTO',
  PAGO = 'PAGO',
  CANCELADO = 'CANCELADO',
}

@Entity('pedido')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  subtotal: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  total: number;

  @Column({ type: 'int', default: 0 })
  quantidadeTotal: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataCriacao: Date;

  @Column({
    type: 'enum',
    enum: PedidoStatus,
    default: PedidoStatus.ABERTO,
  })
  status: PedidoStatus;

  // N:1 com Cliente (CORRIGE: Property 'pedidos' does not exist)
  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  @JoinColumn({ name: 'cliente_id' })
  cliente: Cliente;

  // N:1 com Endereço
  @ManyToOne(() => Endereco)
  @JoinColumn({ name: 'endereco_id' })
  endereco: Endereco;

  // 1:N com ItemPedido
  @OneToMany(() => ItemPedido, (itemPedido) => itemPedido.pedido)
  itens: ItemPedido[];
}