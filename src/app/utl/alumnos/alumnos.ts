import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // <--- 1. Importar RouterLink
import { ProyectoapiService } from './proyectoapi.service';
import { AlumnosFilterPipe } from './alumnos-filter.pipe';
import { IAlumno } from './alumnos-utl';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    FormsModule, 
    CommonModule, 
    RouterLink, // <--- 2. Agregar RouterLink aquí para que funcionen los clics
    AlumnosFilterPipe
  ],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css',
})
export class Alumnos implements OnInit {
  imageWidth: number = 50;
  imageMargin: number = 2;
  muestraImg: boolean = true;
  listFilter: string = '';
  alumnoTitle!: string;

  // Inicializamos dataSource como un objeto con la propiedad alumnos vacía
  dataSource: any = { alumnos: [] };

  constructor(public alumnosUtl: ProyectoapiService) {}

  ngOnInit(): void {
    this.alumnosUtl.getAlumnos().subscribe({
      next: (response: any) => {
        console.log("ESTO DEVUELVE FLASK:", response);
        // Asignamos la respuesta completa de Flask a dataSource
        this.dataSource = response;
      },
      error: (error: any) => console.log('Error:', error)
    });
  }
}