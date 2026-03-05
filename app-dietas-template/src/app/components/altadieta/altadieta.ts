import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-altadieta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './altadieta.html',
  styleUrls: ['./altadieta.css']
})
export class AltaDietaComponent {
  nombre: string = '';
  celular: string = '';
  idContacto: number | null = null;

  generos: any[] = [];
  edades: any[] = [];
  tiposDiabetes: any[] = [];
  tiposEjercicio: any[] = [];

  generoSeleccionado: number | null = null;
  edadSeleccionada: number | null = null;
  diabetesSeleccionada: number | null = null;
  ejercicioSeleccionado: number | null = null;

  estaturaSeleccionada: number = 170; // default
  idEstatura: number = 21; // fijo
  pesoSeleccionado: number | null = null;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  guardarContacto() {
    const body = {
      mombre: this.nombre, // el backend espera "mombre"
      movil: this.celular,
      estatus: 1
    };

    this.http.post<number>('http://localhost:8088/plan/alimenticio/guardaContacto', body)
      .subscribe(resp => {
        this.idContacto = resp;
        this.cargarCombos();
      });
  }

  cargarCombos() {
    this.http.get<any[]>('http://localhost:8088/plan/alimenticio/ejecutar_sp/1')
      .subscribe(data => this.generos = data);

    this.http.get<any[]>('http://localhost:8088/plan/alimenticio/ejecutar_sp/2')
      .subscribe(data => this.edades = data);

    this.http.get<any[]>('http://localhost:8088/plan/alimenticio/ejecutar_sp/3')
      .subscribe(data => this.tiposDiabetes = data);

    this.http.get<any[]>('http://localhost:8088/plan/alimenticio/ejecutar_sp/4')
      .subscribe(data => this.tiposEjercicio = data);
  }

  guardarSuscriptor() {
    const body = {
      id_contacto: this.idContacto,
      id_genero: this.generoSeleccionado,
      id_edad: this.edadSeleccionada,
      id_tipodiabetes: this.diabetesSeleccionada,
      id_estatura: this.idEstatura,
      id_peso: this.pesoSeleccionado,
      imc: 0,
      proteina: 0,
      estatus: "",
      id_tipo_ejercicio: this.ejercicioSeleccionado,
      id_plan_alimentos: 0,
      fecha_registro: "",
      estatus_suscriptor: 1
    };

    this.http.post('http://localhost:8088/plan/alimenticio/guardarSuscriptor', body, { observe: 'response' })
      .subscribe(resp => {
        switch (resp.status) {
          case 201:
            this.toastr.success('Suscriptor guardado correctamente');
            break;
          case 404:
            this.toastr.error('Error al guardar');
            break;
          case 400:
            this.toastr.error('Datos inválidos');
            break;
          default:
            this.toastr.error('Error inesperado');
        }
      }, error => {
        // Manejo de códigos personalizados que vienen en el body
        if (error.error?.code) {
          const code = error.error.code;
          switch (code) {
            case 101: this.toastr.error('Validación: sin género seleccionado'); break;
            case 102: this.toastr.error('Validación: sin edad seleccionada'); break;
            case 103: this.toastr.error('Validación: sin tipo de diabetes seleccionada'); break;
            case 104: this.toastr.error('Validación: sin estatura seleccionada'); break;
            case 105: this.toastr.error('Validación: sin peso seleccionado'); break;
            case 106: this.toastr.error('Validación: sin tipo de ejercicio seleccionado'); break;
            case 111: this.toastr.error('Validación: bajo peso, plan especial con seguimiento médico'); break;
            default: this.toastr.error('Error desconocido');
          }
        } else {
          this.toastr.error('Error en la conexión con el servidor');
        }
      });
  }
}
