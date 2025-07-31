import { Routes } from '@angular/router';
import { ChamadoComponent } from './components/chamados/chamado-component/chamado-component.component';

export const routes: Routes = [
    { path: '', redirectTo: '/chamados', pathMatch: 'full' },  // Redireciona para o chamado ao iniciar
    { path: '**', redirectTo: 'chamados' },
    { path: 'chamados', component: ChamadoComponent },


];