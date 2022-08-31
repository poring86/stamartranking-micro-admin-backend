import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { JogadoresService } from './jogadores/jogadores.service';
import { JogadoresController } from './jogadores/jogadores.controller';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sradmbackend?directConnection=true',
      {
        useUnifiedTopology: true,
      },
    ),
    CategoriasModule,
    JogadoresModule,
  ],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class AppModule {}
