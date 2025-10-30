import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Endereco } from '../../endereco/entities/endereco.entity'; 

@Entity('cliente')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ unique: true }) // E-mail é a chave única de login
  email: string;

  @Column()
  senha: string; 

  @Column({ length: 20, nullable: true })
  telefone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataDeCadastro: Date;

  // Relacionamento 1:N (Um cliente tem MUITOS endereços)
  @OneToMany(() => Endereco, (endereco) => endereco.cliente)
  enderecos: Endereco[];
}
