import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEnderecoDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: 'O clienteId é obrigatório' })
  clienteId: number;

  @IsString()
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  rua: string;

  @IsString()
  @IsNotEmpty({ message: 'O número é obrigatório' })
  numero: string;

  @IsString()
  @IsOptional()
  complemento?: string;

  @IsString()
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  cidade: string;

  @IsString()
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  estado: string;

  @IsString()
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  cep: string;

  @IsBoolean()
  @IsOptional()
  padrao?: boolean;
}

