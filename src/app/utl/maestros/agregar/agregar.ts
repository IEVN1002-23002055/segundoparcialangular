import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-agregar-maestro',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './agregar.html',
  styleUrl: './agregar.css'
})
export class AgregarMaestro implements OnInit {
  formulario!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ProyectoapiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      idMaestro: ['', Validators.required],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: [''],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      alert('Por favor completa los campos obligatorios.');
      return;
    }

    this.apiService.agregarNuevoMaestro(this.formulario.value).subscribe({
      next: () => {
        alert('Maestro registrado correctamente');
        this.router.navigate(['/utl/maestros']);
      },
      error: (err) => {
        console.error('Error al registrar el maestro:', err);
        alert('Ocurrió un error al registrar el maestro (Quizás el ID ya existe).');
      }
    });
  }
}