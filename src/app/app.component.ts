import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalculoComponent } from './calculo/calculo.component';  
import { Router, Event, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule,CalculoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  constructor(private router: Router) {
  this.router.events.subscribe((event: Event) => {
    if (event instanceof NavigationEnd) {
      window.scrollTo(0, 0); // Mueve la pantalla al inicio al cambiar de página
    }
  });
}}