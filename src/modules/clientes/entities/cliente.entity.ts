import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Endereco } from '../../enderecos/entities/endereco.entity';
import { Pedido } from '../../pedidos/entities/pedido.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  telefone: string;

  @CreateDateColumn()
  criadoEm: Date;

  @OneToMany(() => Endereco, (endereco) => endereco.cliente)
  enderecos: Endereco[];

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];
}

