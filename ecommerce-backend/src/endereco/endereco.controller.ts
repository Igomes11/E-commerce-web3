import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { EnderecoService } from './endereco.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { Endereco } from './entities/endereco.entity';

@Controller('endereco')
@UsePipes(new ValidationPipe({ transform: true }))
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  // POST /endereco: Cria um novo endereço para um cliente
  @Post()
  create(@Body() createEnderecoDto: CreateEnderecoDto): Promise<Endereco> {
    return this.enderecoService.create(createEnderecoDto);
  }

  // GET /endereco/cliente/:clienteId: Lista todos os endereços de um cliente
  @Get('cliente/:clienteId')
  findAllByCliente(
    @Param('clienteId', ParseIntPipe) clienteId: number,
  ): Promise<Endereco[]> {
    return this.enderecoService.findAllByCliente(clienteId);
  }

  // GET /endereco/:id: Retorna um endereço específico
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Endereco> {
    return this.enderecoService.findOne(id);
  }

  // PATCH /endereco/:id: Atualiza um endereço
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEnderecoDto: UpdateEnderecoDto,
  ): Promise<Endereco> {
    return this.enderecoService.update(id, updateEnderecoDto);
  }

  // DELETE /endereco/:id: Remove um endereço
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.enderecoService.remove(id);
  }
}
