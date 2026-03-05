
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,   // ← importa el Navbar
    FooterComponent    // ← importa el Footer
  ],
  templateUrl: './app.html'
})
export class App {}
