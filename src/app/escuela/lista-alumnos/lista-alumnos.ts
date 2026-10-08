import { OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { IAlumno } from '../ialumnos';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lista-alumnos.html',
  styleUrl: './lista-alumnos.css'
})
export class ListaAlumnos implements OnInit {
  formulario!: FormGroup;

  alumnos: IAlumno[] = [];
  nuevoAlumno: IAlumno = {
    matricula: 'xx',
    nombre: 'xx',
    correo: 'xx',
    materia: 'xx'
  };

  ngOnInit(): void {
    this.cargarAlumno();

    this.formulario = new FormGroup({
      matricula: new FormControl(''),
      nombre: new FormControl(''),
      correo: new FormControl(''),
      materia: new FormControl('')
    });
  }  

  muestraAlumnos(): void {
    this.nuevoAlumno.matricula = this.formulario.value.matricula;
    this.nuevoAlumno.nombre = this.formulario.value.nombre;
    this.nuevoAlumno.correo = this.formulario.value.correo;
    this.nuevoAlumno.materia = this.formulario.value.materia;
  }

  cargarAlumno(): void {
  }
}