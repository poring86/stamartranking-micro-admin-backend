import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaSchema } from './interfaces/categorias/categoria.schema';
import { JogadorSchema } from './interfaces/jogadores/jogador.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sradmbackend?directConnection=true',
      {
        useUnifiedTopology: true,
      },
    ),
    MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaSchema }]),
    MongooseModule.forFeature([{ name: 'Jogador', schema: JogadorSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
