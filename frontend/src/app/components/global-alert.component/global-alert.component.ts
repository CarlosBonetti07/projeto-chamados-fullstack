import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService, Alerta } from '../../services/message.service';

@Component({
  selector: 'app-global-alert',
   standalone: true,
   imports: [CommonModule],
  templateUrl: './global-alert.component.html',
  styleUrls: ['./global-alert.component.css']
})
export class GlobalAlertComponent implements OnInit {
  alertas: Alerta[] = [];

  constructor(private message: MessageService) {}

  ngOnInit() {
    this.message.alert$.subscribe(alerta => {
      this.alertas.push(alerta);

      // Remover depois de 5 segundos
      setTimeout(() => {
        this.alertas.shift();
      }, 5000);
    });
  }

  fechar(i: number) {
    this.alertas.splice(i, 1);
  }
}