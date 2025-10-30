import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity'; // Importa Cliente

@Entity('endereco')
export class Endereco {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  logradouro: string;

  @Column({ length: 20 })
  numero: string;

  @Column({ length: 100, nullable: true })
  complemento: string;

  @Column({ length: 50 })
  bairro: string;

  @Column({ length: 50 })
  cidade: string;

  @Column({ length: 2 })
  estado: string;

  @Column({ length: 10 })
  cep: string;
  
  // Campo que marca se é o endereço principal do cliente
  @Column({ default: false })
  principal: boolean;

  // Relacionamento N:1 com Cliente (Muitos Endereços pertencem a UM Cliente)
  @ManyToOne(() => Cliente, (cliente) => cliente.enderecos)
  @JoinColumn({ name: 'cliente_id' }) // Coluna FK no BD
  cliente: Cliente;
  
  @Column({ name: 'cliente_id' }) // ID da chave estrangeira
  clienteId: number;
}
