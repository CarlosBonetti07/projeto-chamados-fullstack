import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alerta {
  tipo: 'success' | 'info' | 'warning' | 'danger';
  mensagem: string;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private alertSubject = new Subject<Alerta>();
  alert$ = this.alertSubject.asObservable();

  private show(tipo: Alerta['tipo'], mensagem: string) {
    this.alertSubject.next({ tipo, mensagem });
  }

  success(mensagem: string) {
    this.show('success', mensagem);
  }

  info(mensagem: string) {
    this.show('info', mensagem);
  }

  warning(mensagem: string) {
    this.show('warning', mensagem);
  }

  error(mensagem: string) {
    this.show('danger', mensagem);
  }
}