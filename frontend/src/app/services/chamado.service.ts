import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chamado } from '../models/chamado.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChamadoService {
  private apiUrl = 'http://localhost:8080/api/chamados';

  constructor(private http: HttpClient) {}

  listar(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }

  buscar(id: number): Observable<Chamado> {
    return this.http.get<Chamado>(`${this.apiUrl}/${id}`);
  }

  criar(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.apiUrl, chamado);
  }

  atualizar(id: number, chamado: Chamado): Observable<Chamado> {
    return this.http.put<Chamado>(`${this.apiUrl}/${id}`, chamado);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}