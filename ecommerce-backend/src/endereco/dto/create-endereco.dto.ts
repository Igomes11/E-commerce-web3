// Caminho: ecommerce-backend/src/endereco/dto/create-endereco.dto.ts
import { IsNotEmpty, IsString, IsOptional, MaxLength, IsBoolean, IsInt, Matches } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateEnderecoDto {
  @IsNotEmpty({ message: 'O logradouro é obrigatório.' })
  @IsString({ message: 'O logradouro deve ser uma string.' })
  @MaxLength(100)
  logradouro: string;

  @IsNotEmpty({ message: 'O número é obrigatório.' })
  @IsString({ message: 'O número deve ser uma string.' })
  @MaxLength(10)
  numero: string;

  @IsOptional()
  @IsString({ message: 'O complemento deve ser uma string.' })
  @MaxLength(50)
  complemento?: string;

  @IsNotEmpty({ message: 'O bairro é obrigatório.' })
  @IsString({ message: 'O bairro deve ser uma string.' })
  @MaxLength(50)
  bairro: string;

  @IsNotEmpty({ message: 'A cidade é obrigatória.' })
  @IsString({ message: 'A cidade deve ser uma string.' })
  @MaxLength(50)
  cidade: string;

  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  @IsString({ message: 'O estado deve ser uma string.' })
  @MaxLength(2)
  estado: string;

  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  @IsString({ message: 'O CEP deve ser uma string.' })
  @Matches(/^\d{5}-?\d{3}$/, { message: 'O CEP deve ser um formato válido (ex: 12345-678).' })
  @MaxLength(9)
  cep: string;

  @IsOptional()
  @IsBoolean({ message: 'O campo principal deve ser booleano.' })
  @Type(() => Boolean)
  // Define um valor padrão para resolver o erro de tipagem TS2345 no Service
  principal?: boolean = false; 
  
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório para testes.' })
  @IsInt({ message: 'O ID do cliente deve ser um número inteiro.' })
  @Type(() => Number)
  clienteId: number; 
}