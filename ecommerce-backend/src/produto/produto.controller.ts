import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { Produto } from './entities/produto.entity';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // POST /produto: Cria um novo produto
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createProdutoDto: CreateProdutoDto): Promise<Produto> {
    return this.produtoService.create(createProdutoDto);
  }

  // GET /produto: Lista todos os produtos (com filtros)
  @Get()
  async findAll(
    // Filtros opcionais baseados no escopo:
    @Query('nome') nome?: string,
    @Query('categoriaId', new ParseIntPipe({ optional: true }))
    categoriaId?: number,
    @Query('minPreco') minPreco?: number,
    @Query('maxPreco') maxPreco?: number,
  ): Promise<Produto[]> {
    return this.produtoService.findAll(nome, categoriaId, minPreco, maxPreco);
  }

  // GET /produto/:id: Retorna os detalhes de um produto
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findOne(id);
  }

  // PATCH /produto/:id: Atualiza parcialmente um produto
  // Exemplo (ProdutoController):
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ): Promise<Produto> {
    return this.produtoService.update(id, updateProdutoDto);
  }

  // DELETE /produto/:id: Remove um produto
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.produtoService.remove(id);
  }
}
