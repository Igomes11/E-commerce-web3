// Caminho: ecommerce-backend/src/categoria/categoria.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from './entities/categoria.entity';

@Controller('categoria')
// Aplica a validação para todas as rotas
@UsePipes(new ValidationPipe({ transform: true }))
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  // POST /categoria
  @Post()
  create(@Body() createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaService.create(createCategoriaDto);
  }

  // GET /categoria
  @Get()
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  // GET /categoria/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findOne(id);
  }

  // PATCH /categoria/:id <--- ROTA DE ATUALIZAÇÃO
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    return this.categoriaService.update(id, updateCategoriaDto);
  }

  // DELETE /categoria/:id
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.categoriaService.remove(id);
  }
}
