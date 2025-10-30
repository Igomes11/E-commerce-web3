import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto';

// O PartialType permite que todos os campos de CreateProdutoDto sejam opcionais no PUT/PATCH
export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {}
