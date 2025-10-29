import { Controller, Post, Patch, Body, Param } from '@nestjs/common';
import { PagamentosService } from './pagamentos.service';

@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post()
  criar(@Body() dto: { pedidoId: string; metodo: string }) {
    return this.pagamentosService.criarPagamento(dto);
  }

  @Patch(':id/confirmar')
  confirmar(@Param('id') id: string) {
    return this.pagamentosService.confirmarPagamento(id);
  }
}
