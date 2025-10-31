// Caminho: ecommerce-backend/src/categoria/dto/update-categoria.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaDto } from './create-categoria.dto';

// O PartialType permite que todos os campos do CreateCategoriaDto sejam opcionais
export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {}