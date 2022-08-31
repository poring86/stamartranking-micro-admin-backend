import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CategoriasService } from './categorias.service';
import { Categoria } from './interfaces/categoria.interface';

const ackErrors: string[] = ['E11000'];

@Controller()
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @EventPattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: Categoria,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log('categoria', categoria);

    try {
      await this.categoriasService.criarCategoria(categoria);
      await channel.ack(originalMsg);
    } catch (e) {
      // ackErrors.forEach(async (ackError) => {
      //   if (e.message.includes(ackError)) {
      //     await channel.ack(originalMsg);
      //   }
      // });

      const filterAckError = ackErrors.filter((ackError) =>
        e.message.includes(ackError),
      );
      if (filterAckError) {
        await channel.ack(originalMsg);
      }
    }
  }

  @MessagePattern('consultar-categorias')
  async consultarCategorias(
    @Payload() _id: string,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      if (_id) {
        return await this.categoriasService.consultarCategoriaPeloId(_id);
      } else {
        return await this.categoriasService.consultarTodasCategorias();
      }
    } finally {
      await channel.ack(originalMsg);
    }
  }

  @EventPattern('atualizar-categoria')
  async atualizarCategoria(@Payload() data, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      const { id: _id, categoria } = data;
      await this.categoriasService.atualizarCategoria(_id, categoria);
      await channel.ack(originalMsg);
    } catch (e) {
      const filterAckError = ackErrors.filter((ackError) =>
        e.message.includes(ackError),
      );

      if (filterAckError) {
        await channel.ack(originalMsg);
      }
    }
  }
}
