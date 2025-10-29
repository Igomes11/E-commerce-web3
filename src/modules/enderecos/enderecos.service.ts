import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { Cliente } from '../clientes/entities/cliente.entity';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Injectable()
export class EnderecosService {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  // ✅ cria um novo endereço vinculado ao cliente
  async create(clienteId: number, dto: CreateEnderecoDto) {
    const cliente = await this.clienteRepository.findOne({ where: { id: clienteId } });
    if (!cliente) throw new NotFoundException('Cliente não encontrado');

    // se o novo endereço for padrão, desmarca os anteriores
    if (dto.padrao) {
      await this.enderecoRepository.update({ cliente }, { padrao: false });
    }

    const endereco = this.enderecoRepository.create({ ...dto, cliente });
    return this.enderecoRepository.save(endereco);
  }

  // ✅ lista todos os endereços
  findAll() {
    return this.enderecoRepository.find({ relations: ['cliente'] });
  }

  // ✅ busca um endereço por id
  async findOne(id: string) {
    const endereco = await this.enderecoRepository.findOne({ where: { id }, relations: ['cliente'] });
    if (!endereco) throw new NotFoundException('Endereço não encontrado');
    return endereco;
  }

  // ✅ atualiza dados de um endereço
  async update(id: string, dto: UpdateEnderecoDto) {
    const endereco = await this.findOne(id);
    Object.assign(endereco, dto);
    return this.enderecoRepository.save(endereco);
  }

  // ✅ remove um endereço
  async remove(id: string) {
    const endereco = await this.findOne(id);
    return this.enderecoRepository.remove(endereco);
  }
}
