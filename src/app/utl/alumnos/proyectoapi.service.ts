import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoapiService {
  // URL base de tu API de Flask
  private apiURL = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) {}

  // --- MÓDULO DE ALUMNOS ---

  // 1. Obtener la lista completa de alumnos
  getAlumnos(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/alumnos/`);
  }

  // 2. Obtener un solo alumno por su matrícula
  getAlumno(matricula: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/alumnos/${matricula}`);
  }

  // 3. Agregar un nuevo alumno (Ruta limpia sin /agregar)
  agregarNuevoAlumno(alumno: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/alumnos/`, alumno);
  }

  // 4. Modificar / Actualizar un alumno existente (Ruta limpia sin /actualizar/)
  modificarAlumno(matricula: string | number, alumno: any): Observable<any> {
    return this.http.put<any>(`${this.apiURL}/alumnos/${matricula}`, alumno);
  }

  // 5. Eliminar un alumno (Ruta limpia sin /eliminar/)
  eliminarAlumno(matricula: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/alumnos/${matricula}`);
  }
}