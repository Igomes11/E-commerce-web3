import { IsNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemPedidoDto {
  @IsNotEmpty({ message: 'O ID do produto é obrigatório.' })
  @IsInt({ message: 'O ID do produto deve ser um número inteiro.' })
  @Type(() => Number)
  produtoId: number;

  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @IsInt({ message: 'A quantidade deve ser um número inteiro.' })
  @Min(1, { message: 'A quantidade mínima é 1.' })
  @Type(() => Number)
  quantidade: number;
}
