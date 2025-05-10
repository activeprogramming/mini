import { Routes } from '@angular/router';
import { CalculoComponent } from './calculo/calculo.component'; 


export const routes: Routes = [
    { path: 'calculo', component: CalculoComponent },
    { path: '', redirectTo: 'calculo', pathMatch: 'full' },
    { path: '**', redirectTo: 'calculo' },


  ];