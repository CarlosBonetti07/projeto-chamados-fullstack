import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Analista } from '../models/analista.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalistaService {
  private apiUrl = 'http://localhost:8080/api/analistas';

  constructor(private http: HttpClient) {}

  listar(): Observable<Analista[]> {
    return this.http.get<Analista[]>(this.apiUrl);
  }

  buscar(id: number): Observable<Analista> {
    return this.http.get<Analista>(`${this.apiUrl}/${id}`);
  }

  criar(analista: Analista): Observable<Analista> {
    return this.http.post<Analista>(this.apiUrl, analista);
  }

  atualizar(id: number, analista: Analista): Observable<Analista> {
    return this.http.put<Analista>(`${this.apiUrl}/${id}`, analista);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}