import { IsNotEmpty, IsInt, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ItemPedidoDto } from './item-pedido.dto';

export class CreatePedidoDto {
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório.' })
  @IsInt({ message: 'O ID do cliente deve ser um número inteiro.' })
  @Type(() => Number)
  clienteId: number;

  @IsNotEmpty({ message: 'O ID do endereço é obrigatório.' })
  @IsInt({ message: 'O ID do endereço deve ser um número inteiro.' })
  @Type(() => Number)
  enderecoId: number;

  @ArrayMinSize(1, { message: 'O pedido deve conter pelo menos um item.' })
  @ValidateNested({ each: true }) // Valida cada item dentro do array
  @Type(() => ItemPedidoDto)
  itens: ItemPedidoDto[];
}
