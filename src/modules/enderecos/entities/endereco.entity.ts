import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rua: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column({ default: false })
  padrao: boolean;

  @ManyToOne(() => Cliente, (cliente) => cliente.enderecos)
  cliente: Cliente;
}
