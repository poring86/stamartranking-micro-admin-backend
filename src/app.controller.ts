import {
  Body,
  Controller,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';
import { Categoria } from './interfaces/categorias/categoria.interface';

const ackErrors: string[] = ['E11000'];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('criar-categoria')
  async criarCategoria(
    @Payload() categoria: Categoria,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    console.log('categoria', categoria);

    try {
      await this.appService.criarCategoria(categoria);
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
        return await this.appService.consultarCategoriaPeloId(_id);
      } else {
        return await this.appService.consultarTodasCategorias();
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
      await this.appService.atualizarCategoria(_id, categoria);
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
