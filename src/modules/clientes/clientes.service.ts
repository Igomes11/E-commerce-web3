// src/clientes/clientes.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import { Cliente } from './entities/cliente.entity'; // Certifique-se de ter esta Entidade
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    // 1. INJEÇÃO DE DEPENDÊNCIA DO REPOSITÓRIO
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,
  ) {}

  // 1. Criar um Cliente (POST)
  async create(createClienteDto: CreateClienteDto) {

    const novoCliente = this.clienteRepository.create({
      ...createClienteDto,
    });

    return this.clienteRepository.save(novoCliente);
  }

  // 2. Listar Todos os Clientes (GET /clientes)
  findAll(): Promise<Cliente[]> {
    // Usa o repositório para buscar todos os clientes
    return this.clienteRepository.find();
  }

  // 3. Buscar por ID (GET /clientes/:id)
  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id } });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID #${id} não encontrado`);
    }
    return cliente;
  }

  // 4. Atualizar (PATCH /clientes/:id)
  async update(id: number, updateClienteDto: UpdateClienteDto) {
    // Primeiro, verifica se existe
    const cliente = await this.clienteRepository.findOne({where: {id}});
    if (!cliente) {
      throw new NotFoundException(`Cliente com ID #${id} não encontrado`);
    }
    
    // Mescla as mudanças e salva (UPDATE)
    Object.assign(cliente, updateClienteDto);
    return this.clienteRepository.save({ ...cliente, ...updateClienteDto });
  }

  // 5. Remover (DELETE /clientes/:id)
  async remove(id: number) {
    const resultado = await this.clienteRepository.delete(id);
    
    if (resultado.affected === 0) {
      throw new NotFoundException(`Cliente com ID #${id} não encontrado`);
    }
    return { message: `Cliente com ID #${id} removido com sucesso` };
  }
}