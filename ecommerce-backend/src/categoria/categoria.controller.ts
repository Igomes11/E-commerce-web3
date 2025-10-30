import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, HttpCode } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

// A rota base será /categoria
@Controller('categoria')
// Aplica validação automática a todos os DTOs neste controller
// UsePipes garante que as regras do DTO sejam aplicadas antes de chegar ao Service
@UsePipes(new ValidationPipe({ transform: true, whitelist: true })) 
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // POST /categoria
  // Cria uma nova categoria
  @Post()
  @HttpCode(201) // Status de sucesso para criação (Created)
  create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(createCategoriaDto);
  }

  // GET /categoria
  // Retorna todas as categorias
  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  // GET /categoria/:id
  // Retorna uma categoria específica
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Categoria> {
    // O '+' antes do 'id' converte a string do parâmetro para número
    return this.categoriaService.findOne(+id);
  }

  // PUT /categoria/:id
  // Atualiza uma categoria
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.update(+id, updateCategoriaDto);
  }

  // DELETE /categoria/:id
  // Remove uma categoria
  @Delete(':id')
  @HttpCode(204) // Status de sucesso para remoção (No Content)
  remove(@Param('id') id: string): Promise<void> {
    return this.categoriaService.remove(+id);
  }
}
