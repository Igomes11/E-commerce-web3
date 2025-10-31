import { PartialType } from '@nestjs/mapped-types';
import { CreateEnderecoDto } from './create-endereco.dto';

// O PartialType permite que todos os campos do CreateEnderecoDto sejam opcionais
export class UpdateEnderecoDto extends PartialType(CreateEnderecoDto) {}
