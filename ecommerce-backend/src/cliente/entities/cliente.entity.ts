import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Endereco } from '../../endereco/entities/endereco.entity';

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ unique: true }) // E-mail deve ser único
  email: string;

  // Exclui o campo 'senha' dos retornos da API (para segurança)
  @Exclude()
  @Column()
  senha: string;

  @Column({ length: 20, nullable: true })
  telefone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataDeCadastro: Date;

  // Relacionamento 1:N com Endereço
  @OneToMany(() => Endereco, (endereco) => endereco.cliente)
  enderecos: Endereco[];
}