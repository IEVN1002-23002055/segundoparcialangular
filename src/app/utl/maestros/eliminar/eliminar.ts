import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service'; // Ajusta la ruta relativa si es necesario

@Component({
  selector: 'app-eliminar-maestro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './eliminar.html',
  styleUrl: './eliminar.css'
})
export class EliminarMaestro implements OnInit {
  idMaestro: string = '';
  
  regMaestro: any = {
    id: '',
    nombre: '',
    apaterno: '',
    amaterno: '',
    correo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Obtener el ID del maestro desde la ruta (ej: /utl/maestros/eliminar/:id)
    this.idMaestro = this.route.snapshot.paramMap.get('id') || '';

    // 2. Cargar los datos del maestro para mostrarlos en la tarjeta de confirmación
    if (this.idMaestro) {
      this.apiService.getMaestro(this.idMaestro).subscribe({
        next: (response: any) => {
          this.regMaestro = response.maestro || response;
        },
        error: (err) => console.error('Error al cargar datos del maestro:', err)
      });
    }
  }

  eliminarMaestro(): void {
    if (!confirm(`¿Estás seguro de que deseas eliminar al maestro ${this.regMaestro.nombre}?`)) {
      return;
    }

    // 3. Enviar la petición de borrado al backend de Flask
    this.apiService.eliminarMaestro(this.idMaestro).subscribe({
      next: () => {
        alert('Maestro eliminado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (err) => {
        console.error('Error al eliminar el maestro:', err);
        alert('Ocurrió un error al intentar eliminar el registro');
      }
    });
  }
}