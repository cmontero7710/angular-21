import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-griddietas',
  standalone: true,
  imports: [CommonModule],   // ← necesario para *ngFor y *ngIf
  templateUrl: './griddietas.html',
  styleUrls: ['./griddietas.css']
})
export class GridDietasComponent {
  dietas$!: Observable<any>; // usamos Observable en lugar de array

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.dietas$ = this.http.get<any>(
      'http://localhost:8088/plan/alimenticio/listarxpag?page=0&size=5'
    );
  }
}
