// ecommerce-backend/src/pagamento/pagamento.controller.ts

import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
// CORREÇÃO: Imports de validação devem vir de 'class-validator'
import { IsIn, IsString } from 'class-validator';

import { PagamentoService } from './pagamento.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { Pagamento, PagamentoStatus } from './entities/pagamento.entity';

// DTO Auxiliar para simular o status do pagamento (sucesso/falha)
class SimulatePaymentDto extends CreatePagamentoDto {
  @IsString({ message: 'O status final deve ser uma string.' })
  @IsIn([PagamentoStatus.PAGO, PagamentoStatus.CANCELADO], {
    message: 'Status de simulação inválido.',
  })
  novoStatus: PagamentoStatus;
}

@Controller('pagamento')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  /**
   * Rota POST /pagamento/processar
   * Simula o processamento de um pagamento (e o débito de estoque em caso de sucesso).
   */
  @Post('processar')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  async processarPagamento(
    @Body() simulatePaymentDto: SimulatePaymentDto,
  ): Promise<Pagamento> {
    const { novoStatus, ...pagamentoDto } = simulatePaymentDto;

    // Chama a lógica de transação crítica (pagamento e débito de estoque)
    return this.pagamentoService.processarPagamento(pagamentoDto, novoStatus);
  }
}
