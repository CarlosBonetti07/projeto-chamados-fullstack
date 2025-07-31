import { Analista } from "./analista.model";

export interface Chamado {
  id?: number;
  titulo: string;
  analista?: Analista;
  estado: 'DESENVOLVIMENTO' | 'HOMOLOGACAO' | 'PRODUCAO';
  status: 'ABERTO' | 'EM_ANDAMENTO' | 'FINALIZADO' | 'CANCELADO';
  branch?: string;
  linkAzure?: string;
  descricao?: string;
  tipo?: 'BUG' | 'MELHORIA' | 'TAREFA';
  prioridade?: 'ALTA' | 'MEDIA' | 'BAIXA';
  dataCriacao?: string;
  dataAtualizacao?: string;
}