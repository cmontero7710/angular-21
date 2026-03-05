import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  images: string[] = [
    'public/img/salud1.jpg',
    'public/img/salud2.jpg',
    'public/img/salud3.jpg'
  ];
}
