import { OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ICinepolis } from '../icinepolis';

@Component({
  selector: 'app-cinepolis',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cinepolis.html',
  styleUrl: './cinepolis.css'
})
export class Cinepolis implements OnInit {
  formulario!: FormGroup;

  mensajeError: string = '';
  nombre: string = '';
  tarjetaCine: string = '';
  compradores: number = 0;
  boletos: number = 0;
  valorPagar: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(''),
      tarjetaCine: new FormControl('no'),
      boletos: new FormControl('')
    });
  }

  procesar(): void {
    this.nombre = this.formulario.value.nombre;
    const cliente = Number(this.formulario.value.compradores); 
    this.boletos = Number(this.formulario.value.boletos);
    this.tarjetaCine = this.formulario.value.tarjetaCine;

    this.mensajeError = '';
    this.valorPagar = 0;

    if (this.boletos > cliente * 7) {
      this.mensajeError = 'No puedes comprar más de 7 boletos por persona';
      return;
    }

    let total = this.boletos * 12.00;

    if (this.boletos > 5) {
      total = total * 0.85;
    } else if (this.boletos >= 3 && this.boletos <= 5) {
      total = total * 0.90; 
    }

    if (this.tarjetaCine === 'si') {
      total = total * 0.90;
    }

    this.valorPagar = Number(total.toFixed(2));

    const nuevaVenta: ICinepolis = {
      nombre: this.nombre,
      compradores: cliente,
      tarjetaCine: this.tarjetaCine,
      boletos: this.boletos,
      valorPagar: this.valorPagar
    };

    const datosGuardados = localStorage.getItem('ventasCinepolis');
    const ventas: ICinepolis[] = datosGuardados ? JSON.parse(datosGuardados) : [];
    ventas.push(nuevaVenta);
    localStorage.setItem('ventasCinepolis', JSON.stringify(ventas));
  }

  verRegistros(): void {
    this.router.navigate(['/escuela/verregistros']);
  }
}