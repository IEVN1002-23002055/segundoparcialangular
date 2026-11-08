import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-agregar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class Agregar implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: [''],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.apiService.agregarNuevoAlumno(this.formGroup.value).subscribe({
      next: () => {
        alert('Alumno registrado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        alert('Ocurrió un error al registrar el alumno');
      }
    });
  }
}