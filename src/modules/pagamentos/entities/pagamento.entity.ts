import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class Pagamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  metodo: string;

  @Column()
  status: string;

  @Column('decimal')
  valor: number;

  @ManyToOne(() => Pedido, pedido => pedido.pagamentos, { eager: false })
  pedido: Pedido;
}