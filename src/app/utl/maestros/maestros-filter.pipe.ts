import { Pipe, PipeTransform } from '@angular/core';

// Definimos la interfaz basada en los datos de los maestros
export interface IMaestro {
  idMaestro: number;
  nombre: string;
  apaterno: string;
  amaterno: string;
  correo: string;
}

@Pipe({
  name: 'maestrosFilter',
  standalone: true
})
export class MaestrosFilterPipe implements PipeTransform {
  transform(value: IMaestro[], args: string): IMaestro[] {
    let filter: string = args ? args.toLowerCase() : '';

    return filter
      ? value.filter((maestro: IMaestro) =>
          maestro.nombre.toLowerCase().indexOf(filter) !== -1
        )
      : value;
  }
}