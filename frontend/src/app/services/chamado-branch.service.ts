import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChamadoBranch } from '../models/chamadoBranches.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChamadoBranchService {
  private apiUrl = 'http://localhost:8080/api/chamado-branches';

  constructor(private http: HttpClient) {}

  listar(): Observable<ChamadoBranch[]> {
    return this.http.get<ChamadoBranch[]>(this.apiUrl);
  }

  getBranchesPorChamado(idChamado: number): Observable<ChamadoBranch[]> {
    return this.http.get<ChamadoBranch[]>(this.apiUrl + `/por-chamado/${idChamado}`);
  }

  salvar(branch: ChamadoBranch): Observable<ChamadoBranch> {
    return this.http.post<ChamadoBranch>(this.apiUrl, branch);
  }

  atualizar(branch: ChamadoBranch): Observable<ChamadoBranch> {
    return this.http.put<ChamadoBranch>(`${this.apiUrl}/${branch.id}`, branch);
  }

  salvarBranchesLote(chamadoId: number, branches: ChamadoBranch[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/lote/${chamadoId}`, branches);
  }


  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}