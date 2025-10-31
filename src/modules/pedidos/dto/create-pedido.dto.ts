import { IsArray, ValidateNested, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

class ItemPedidoDto {
  
  produtoId: number;

  @IsInt()
  @Min(1)
  quantidade: number;
}

export class CreatePedidoDto {
  clienteId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemPedidoDto)
  itens: ItemPedidoDto[];
}
