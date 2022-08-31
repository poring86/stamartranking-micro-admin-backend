import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
  appService: any;
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
  ) {}

  async criarCategoria(categoria: Categoria): Promise<Categoria> {
    try {
      const categoriaCriada = new this.categoriaModel(categoria);
      return await categoriaCriada.save();
    } catch (e) {
      throw new RpcException(e.message);
    }
  }

  async consultarTodasCategorias(): Promise<Categoria[]> {
    try {
      return await this.categoriaModel.find().exec();
    } catch (e) {
      throw new RpcException(e.message);
    }
  }

  async consultarCategoriaPeloId(_id: string): Promise<Categoria> {
    try {
      return this.categoriaModel.findOne({ _id }).exec();
    } catch (e) {
      throw new RpcException(e.message);
    }
  }

  async atualizarCategoria(_id: string, categoria: Categoria): Promise<void> {
    try {
      await this.categoriaModel
        .findOneAndUpdate({ _id }, { $set: categoria })
        .exec();
    } catch (e) {
      throw new RpcException(e.message);
    }
  }
}
