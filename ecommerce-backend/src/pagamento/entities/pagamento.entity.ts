import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Pedido } from '../../pedido/entities/pedido.entity';

// Enum para o status do pagamento
export enum PagamentoStatus {
  PENDENTE = 'PENDENTE',
  PAGO = 'PAGO',
  CANCELADO = 'CANCELADO',
}

@Entity('pagamento')
export class Pagamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  metodo: string; // Cartão, Boleto, PIX

  @Column({
    type: 'enum',
    enum: PagamentoStatus,
    default: PagamentoStatus.PENDENTE,
  })
  status: PagamentoStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataPagamento: Date;

  // 1:1 com Pedido (Chave Estrangeira)
  @OneToOne(() => Pedido, (pedido) => pedido.pagamento)
  @JoinColumn({ name: 'pedido_id' })
  pedido: Pedido;
}