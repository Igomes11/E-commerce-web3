import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EnderecosService } from './enderecos.service';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';

@Controller('enderecos')
export class EnderecosController {
  constructor(private readonly enderecosService: EnderecosService) {}

 @Post()
create(@Body() dto: any) {
  const { clienteId, ...dadosEndereco } = dto;
  const clienteIdNum = Number(clienteId);
  return this.enderecosService.create(clienteIdNum, dadosEndereco);
}

  @Get()
  findAll() {
    return this.enderecosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.enderecosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEnderecoDto: UpdateEnderecoDto) {
    return this.enderecosService.update(id, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.enderecosService.remove(id);
  }
}
