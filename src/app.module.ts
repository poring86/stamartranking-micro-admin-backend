import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/sradmbackend?directConnection=true',
      {
        useUnifiedTopology: true,
      },
    ),
    CategoriasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
