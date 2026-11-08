import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ProyectoapiService } from '../proyectoapi.service';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './editar.html',
  styleUrl: './editar.css'
})
export class Editar implements OnInit {
  formGroup!: FormGroup;
  matriculaAlumno: string = '';

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private apiService: ProyectoapiService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricula: [{ value: '', disabled: true }, Validators.required],
      nombre: ['', Validators.required],
      apaterno: ['', Validators.required],
      amaterno: [''],
      correo: ['', [Validators.required, Validators.email]]
    });

    this.matriculaAlumno = this.route.snapshot.paramMap.get('matricula') || '';

    if (this.matriculaAlumno) {
      this.apiService.getAlumno(this.matriculaAlumno).subscribe({
        next: (response: any) => {
          const alumnoData = response.alumno || response;
          this.formGroup.patchValue(alumnoData);
        },
        error: (err) => console.error('Error al cargar alumno:', err)
      });
    }
  }

  onSubmit(): void {
    if (this.formGroup.invalid) return;

    const alumnoData = this.formGroup.getRawValue();

    this.apiService.modificarAlumno(this.matriculaAlumno, alumnoData).subscribe({
      next: () => {
        alert('Alumno actualizado correctamente');
        this.router.navigate(['/utl/alumnos']);
      },
      error: (err) => console.error('Error al modificar:', err)
    });
  }
}