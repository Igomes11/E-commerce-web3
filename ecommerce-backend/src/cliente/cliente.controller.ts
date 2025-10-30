import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from './entities/cliente.entity';

@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  /**
   * Rota POST /cliente para cadastrar um novo cliente.
   * @param createClienteDto Dados de criação do cliente
   * @returns O cliente recém-criado.
   */
  @Post()
  // Aplica a validação do DTO
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return this.clienteService.create(createClienteDto);
  }

  // Outras rotas (GET, PUT, DELETE) serão adicionadas aqui.
}