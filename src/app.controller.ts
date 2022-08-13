import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Categoria } from './interfaces/categorias/categoria.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('criar-categoria')
  async criarCategoria(@Payload() categoria: Categoria) {
    console.log('categoria', categoria);

    await this.appService.criarCategoria(categoria);
  }

  @MessagePattern('consultar-categorias')
  async consultarCategorias(@Payload() _id: string) {
    if (_id) {
      return await this.appService.consultarCategoriaPeloId(_id);
    } else {
      return await this.appService.consultarTodasCategorias();
    }
  }
}
