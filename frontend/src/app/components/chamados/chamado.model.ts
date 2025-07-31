import { Analista } from "../../models/analista.model";

export interface Chamado {
  id: number;
  numero: string;
  descricao: string;
  sistema: string;
  analista: Analista;
  linkAzure: string;
  status: 'Novo' | 'Em Andamento' | 'Concluído';
  arquivos?: string[];
}
