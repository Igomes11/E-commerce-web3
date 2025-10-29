import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';

@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  create(@Body() dto: CreatePedidoDto) {
    const converted = {
      ...dto,
      clienteId: Number(dto.clienteId),
      itens: dto.itens?.map((i) => ({ ...i, produtoId: Number(i.produtoId) })) || [],
    } as CreatePedidoDto;
    return this.pedidosService.create(converted);
  }

  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pedidosService.findOne(id);
  }

  @Patch(':id/cancelar')
  cancel(@Param('id') id: string) {
    return this.pedidosService.cancel(id);
  }
}
