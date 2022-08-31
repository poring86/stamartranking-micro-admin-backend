import { Document } from 'mongoose';

export interface Categoria extends Document {
  readonly categoria: string;
  descricao: string;
  eventos: Evento[];
}

export interface Evento {
  nome: string;
  operacao: string;
  valor: string;
}
