import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],   // ← necesario para ngModel y directivas básicas
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  usuario: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) {}

  login() {
    this.http.post<number>('http://localhost:8088/plan/alimenticio/login', {
      usuario: this.usuario,
      password: this.password
    }).subscribe({
      next: (resp) => {
        if (resp === 1) {
          this.toastr.success('Login correcto');
          this.router.navigate(['/griddietas']);
        } else {
          this.toastr.error('Usuario o password incorrectos');
        }
      },
      error: () => this.toastr.error('Error en la conexión con el servidor')
    });
  }

  cancelar() {
    this.usuario = '';
    this.password = '';
  }
}
