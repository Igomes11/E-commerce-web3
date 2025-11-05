import { Controller, Get, Post, Body, Param, ParseIntPipe, UsePipes, ValidationPipe, Patch, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { PedidoStatus } from './entities/pedido.entity';

@Controller('pedido')
@UsePipes(new ValidationPipe({ transform: true }))
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Pedido> {
    return this.pedidoService.findOne(id);
  }

  @Get('cliente/:clienteId')
  findAllByCliente(@Param('clienteId', ParseIntPipe) clienteId: number): Promise<Pedido[]> {
    return this.pedidoService.findAllByCliente(clienteId);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ): Promise<Pedido> {
    // aceita uma string com o nome do enum, por exemplo "CANCELADO"
    if (!Object.values(PedidoStatus).includes(status as PedidoStatus)) {
      throw new BadRequestException('Status inválido.');
    }
    return this.pedidoService.updateStatus(id, status as PedidoStatus);
  }
}
