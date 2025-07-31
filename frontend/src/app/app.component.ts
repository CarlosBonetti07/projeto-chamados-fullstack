import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GlobalAlertComponent } from './components/global-alert.component/global-alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, GlobalAlertComponent], // importa o componente de alerta
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SoundCloud';
}
