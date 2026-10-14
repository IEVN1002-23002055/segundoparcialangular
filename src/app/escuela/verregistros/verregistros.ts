import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ICinepolis } from '../icinepolis';

@Component({
  selector: 'app-verregistros',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './verregistros.html',
  styleUrl: './verregistros.css'
})
export class Verregistros implements OnInit {
  formulario!: FormGroup;
  ventas: ICinepolis[] = [];
  indiceEdicion: number = -1;
  mensajeError: string = '';

  ngOnInit(): void {
    this.cargarVentas();

    this.formulario = new FormGroup({
      nombre: new FormControl(''),
      compradores: new FormControl(''),
      tarjetaCine: new FormControl('no'),
      boletos: new FormControl('')
    });
  }

  cargarVentas(): void {
    const datos = localStorage.getItem('ventasCinepolis');
    if (datos) {
      this.ventas = JSON.parse(datos);
    }
  }

guardarEdicion(): void {
  if (this.indiceEdicion === -1) return;

  const cliente = Number(this.formulario.value.compradores);
  const boletos = Number(this.formulario.value.boletos);

  if (boletos > cliente * 7) {
    this.mensajeError = 'No puedes comprar más de 7 boletos por persona';
    return;
  }

  this.mensajeError = '';
  let total = boletos * 12.00;

  if (boletos > 5) {
    total = total * 0.85; 
  } else if (boletos >= 3 && boletos <= 5) {
    total = total * 0.90; 
  }
  
  if (this.formulario.value.tarjetaCine === 'si') {
    total = total * 0.90;
  }

  total = Number(total.toFixed(2));

  this.ventas[this.indiceEdicion] = {
    nombre: this.formulario.value.nombre,
    compradores: cliente,
    tarjetaCine: this.formulario.value.tarjetaCine,
    boletos: boletos,
    valorPagar: total
  };

  localStorage.setItem('ventasCinepolis', JSON.stringify(this.ventas));
  this.limpiarEdicion();
}

  editarVenta(index: number): void {
    this.indiceEdicion = index;
    const venta = this.ventas[index];
    this.formulario.patchValue({
      nombre: venta.nombre,
      compradores: venta.compradores,
      tarjetaCine: venta.tarjetaCine,
      boletos: venta.boletos
    });
  }

  eliminarVenta(index: number): void {
    this.ventas.splice(index, 1);
    localStorage.setItem('ventasCinepolis', JSON.stringify(this.ventas));
    if (this.indiceEdicion === index) {
      this.limpiarEdicion();
    }
  }

  limpiarEdicion(): void {
    this.indiceEdicion = -1;
    this.mensajeError = '';
    this.formulario.reset({ tarjetaCine: 'no' });
  }
}