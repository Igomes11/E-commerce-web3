import { IsNotEmpty, IsString, Min, IsNumber } from 'class-validator';

export class CreateProdutoDto {
    @IsString() @IsNotEmpty() nome: string;
    @IsString() descricao: string;
    @IsNumber() @Min(0) preco: number;
    @IsNumber() @Min(0) estoque: number;

}
