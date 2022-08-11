import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interfaces/categorias/categoria.schema';
import { JogadorSchema } from './interfaces/jogadores/jogador.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/smartranking?directConnection=true',
      {
        useUnifiedTopology: true,
      },
    ),
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
