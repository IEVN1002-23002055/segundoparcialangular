import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-editar-maestro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class EditarMaestro implements OnInit {
  formulario!: FormGroup;
  idMaestroParam: string = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Inicializamos el formulario
    this.formulario = this.fb.group({
      idMaestro: [''],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: [''],
      correo: ['', [Validators.required, Validators.email]]
    });

    // 2. Capturamos el ID de la URL
    this.idMaestroParam = this.route.snapshot.paramMap.get('id') || '';
    console.log("ID capturado de la URL:", this.idMaestroParam);

    // 3. Consultamos los datos a Flask
    if (this.idMaestroParam && this.idMaestroParam !== 'undefined') {
      this.apiService.getMaestro(this.idMaestroParam).subscribe({
        next: (response: any) => {
          console.log("Datos recibidos de Flask para editar:", response);
          const maestroData = response.maestro || response.data || response;

          if (maestroData) {
            this.formulario.patchValue({
              idMaestro: maestroData.idMaestro || maestroData.id || '',
              nombre: maestroData.nombre || '',
              apaterno: maestroData.apaterno || '',
              amaterno: maestroData.amaterno || '',
              correo: maestroData.correo || ''
            });
          }
        },
        error: (err) => console.error('Error al cargar los datos del maestro:', err)
      });
    }
  }

  onSubmit(): void {
    console.log("¡Se presionó el botón Modificar!");
    
    // Obtenemos todos los valores (incluyendo los deshabilitados)
    const datosFormulario = this.formulario.getRawValue();
    console.log("Datos que se van a enviar a Flask:", datosFormulario);

    // Mandamos los datos directamente a Flask sin bloquear por validaciones
    this.apiService.modificarMaestro(this.idMaestroParam, datosFormulario).subscribe({
      next: (res) => {
        console.log("Respuesta exitosa de Flask:", res);
        alert('Maestro actualizado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (err) => {
        console.error('Error detallado de Flask al modificar:', err);
        alert('Ocurrió un error al actualizar el registro. Revisa la consola.');
      }
    });
  }
}