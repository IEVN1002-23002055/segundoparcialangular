import { Pipe, PipeTransform } from '@angular/core';

// Definimos la interfaz basada en los datos de los alumnos
export interface IAlumno {
  matricula: string;
  nombre: string;
  apaterno: string;
  amaterno: string;
  correo: string;
}

@Pipe({
  name: 'alumnosFilter',
})
export class AlumnosFilterPipe implements PipeTransform {
  transform(value: IAlumno[], args: string): IAlumno[] {
    let filter: string = args ? args.toLowerCase() : '';

    return filter
      ? value.filter((alumno: IAlumno) =>
          alumno.nombre.toLowerCase().indexOf(filter) !== -1
        )
      : value;
  }
}