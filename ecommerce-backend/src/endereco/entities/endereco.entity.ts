import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  logradouro: string;

  @Column({ length: 10 })
  numero: string;

  @Column({ length: 50, nullable: true })
  complemento: string;

  @Column({ length: 50 })
  bairro: string;

  @Column({ length: 50 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column({ length: 9 })
  cep: string;

  @Column({ default: false })
  principal: boolean;

  // Relacionamento N:1 com Cliente (Muitos Endereços para um Cliente)
  @ManyToOne(() => Cliente, (cliente) => cliente.enderecos)
  @JoinColumn({ name: 'cliente_id' }) // Coluna FK no banco
  cliente: Cliente;
}