export class CreatePedidoDto {
  clienteId: number;
  itens: { produtoId: number; quantidade: number }[];
}
