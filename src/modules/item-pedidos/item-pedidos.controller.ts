import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemPedidosService } from './item-pedidos.service';
import { CreateItemPedidoDto } from './dto/create-item-pedido.dto';
import { UpdateItemPedidoDto } from './dto/update-item-pedido.dto';

@Controller('item-pedidos')
export class ItemPedidosController {
  constructor(private readonly itemPedidosService: ItemPedidosService) {}

  @Post()
  create(@Body() createItemPedidoDto: CreateItemPedidoDto) {
    return this.itemPedidosService.create(createItemPedidoDto);
  }

  @Get()
  findAll() {
    return this.itemPedidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemPedidosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemPedidoDto: UpdateItemPedidoDto) {
    return this.itemPedidosService.update(+id, updateItemPedidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemPedidosService.remove(+id);
  }
}
