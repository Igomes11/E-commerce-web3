import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
  ) {}

  create(createProdutoDto: CreateProdutoDto) {
    const produto = this.produtoRepository.create(createProdutoDto);
    return this.produtoRepository.save(produto);
  }

  findAll() {
    return this.produtoRepository.find({ relations: ['categoria'] });
  }

  findOne(id: number) {
    return this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return this.produtoRepository.update(id, updateProdutoDto);
  }

  remove(id: number) {
    return this.produtoRepository.delete(id);
  }
}
