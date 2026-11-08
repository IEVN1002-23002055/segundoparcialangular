import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './eliminar.html',
  styleUrl: './eliminar.css'
})
export class Eliminar implements OnInit {
  alumno: any = { matricula: '', nombre: 'Cargando...', apaterno: '', amaterno: '', correo: '' };
  matricula: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.matricula = this.route.snapshot.paramMap.get('matricula') || '';
    this.alumno.matricula = this.matricula; // Asignamos la matrícula de la URL de inmediato

    if (this.matricula) {
      this.apiService.getAlumno(this.matricula).subscribe({
        next: (res: any) => {
          console.log('ESTO DEVUELVE FLASK:', res);
          // Si Flask responde, llenamos los datos reales
          this.alumno = res.alumno || res.data || res;
        },
        error: (err) => {
          console.error('Error al cargar de la API:', err);
          // Si falla la API, al menos dejamos la matrícula para que no se quede en blanco
          this.alumno = { 
            matricula: this.matricula, 
            nombre: 'Registro ID ' + this.matricula, 
            apaterno: '', 
            amaterno: '', 
            correo: 'No disponible' 
          };
        }
      });
    }
  }

  confirmarEliminacion(): void {
    this.apiService.eliminarAlumno(this.matricula).subscribe({
      next: () => {
        alert('Alumno eliminado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('Ocurrió un error al intentar eliminar el registro.');
      }
    });
  }
}