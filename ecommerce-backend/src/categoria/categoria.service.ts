import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  /**
   * Cria uma nova categoria, verificando a unicidade do nome.
   * @param createCategoriaDto DTO com o nome da categoria.
   * @returns A categoria salva.
   */
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const nome = createCategoriaDto.nome.toUpperCase();

    // 1. Regra de Negócio: Verificar se a categoria já existe
    const categoriaExistente = await this.categoriaRepository.findOne({
      where: { nome },
    });

    if (categoriaExistente) {
      throw new BadRequestException(`A categoria '${nome}' já existe.`);
    }

    // 2. Salvar no Banco
    const novaCategoria = this.categoriaRepository.create({ nome });
    return this.categoriaRepository.save(novaCategoria);
  }

  /**
   * Retorna todas as categorias.
   */
  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  /**
   * Encontra uma categoria pelo ID.
   * @param id ID da categoria.
   * @returns A categoria encontrada.
   */
  async findOne(id: number): Promise<Categoria> {
    // Usamos o findOneBy aqui para simplicidade, mas findOne com { where } também funciona
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada.`);
    }
    return categoria;
  }

  /**
   * Atualiza uma categoria existente.
   * @param id ID da categoria a ser atualizada.
   * @param updateCategoriaDto Dados de atualização.
   * @returns A categoria atualizada.
   */
  async update(
    id: number,
    updateCategoriaDto: UpdateCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.findOne(id);

    // Verifica se o nome existe no DTO antes de tentar padronizar e salvar
    const novoNome = updateCategoriaDto.nome
      ? updateCategoriaDto.nome.toUpperCase()
      : categoria.nome;

    // Se o nome foi alterado, verificar unicidade
    if (novoNome !== categoria.nome) {
      const categoriaDuplicada = await this.categoriaRepository.findOne({
        where: { nome: novoNome },
      });
      if (categoriaDuplicada && categoriaDuplicada.id !== id) {
        throw new BadRequestException(
          `Já existe uma categoria com o nome '${novoNome}'.`,
        );
      }
    }

    // Aplica a atualização e salva
    categoria.nome = novoNome;
    return this.categoriaRepository.save(categoria);
  }

  /**
   * Remove uma categoria.
   * @param id ID da categoria a ser removida.
   */
  async remove(id: number): Promise<void> {
    const result = await this.categoriaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada.`);
    }
  }
}
