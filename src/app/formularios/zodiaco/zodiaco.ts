import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './zodiaco.html',
  styleUrl: './zodiaco.css'
})


export class Zodiaco {
  nombre: string = '';
  apaterno: string = '';
  amaterno: string = '';
  dia: string = '';
  mes: string = '';
  anio: string = '';
  sexo: string = '';

  nombrecompleto: string = '';
  edad: number = 0;
  signo: string = '';
  imagenes: string = '';
  mostrarsigno: boolean = false;

  imprimir(): void {
  this.nombrecompleto = `${this.nombre} ${this.apaterno} ${this.amaterno}`;

  const hoy = new Date();
  const cumpleanosEsteAnio = new Date(hoy.getFullYear(), Number(this.mes) - 1, Number(this.dia));

  // Resta los años y quita 1 si hoy es antes de su cumpleaños
  this.edad = hoy.getFullYear() - Number(this.anio);
  if (hoy < cumpleanosEsteAnio) {
    this.edad--;
  }

  this.obtenersigno();
  this.mostrarsigno = true;
}

  obtenersigno(): void {
    const resta = (Number(this.anio) - 4) % 12;

    switch (resta) {
      case 0:
        this.signo = 'Rata';
        this.imagenes = 'https://i.etsystatic.com/25722344/r/il/a63fc0/3849562261/il_fullxfull.3849562261_f2o3.jpg';
        break;
      case 1:
        this.signo = 'Buey';
        this.imagenes = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzU-dPhkGb5O4v8d632TMOdcIRxeUhc_wgjRP_ExNE4Q&s=10';
        break;
      case 2:
        this.signo = 'Tigre';
        this.imagenes = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeQr62aeOdzUi1HNYf17djSxMPz3ViF-K4aHaruyv3_A&s=10';
        break;
      case 3:
        this.signo = 'Conejo';
        this.imagenes = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv7KCCzfXEfYFNIIHH8WqVoJafKJYlPXcl54LqfRtdng&s=10';
        break;
      case 4:
        this.signo = 'Dragon';
        this.imagenes = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9MXbybcEESY63RE1bW1OG0PKeIIcGM4rdz5LSXq0RWbf2i5EXSQELYVA&s=10';
        break;
      case 5:
        this.signo = 'Serpiente';
        this.imagenes = 'https://static.wikia.nocookie.net/disneyypixar/images/b/b7/Juju.png/revision/latest?cb=20240517222733&path-prefix=es';
        break;
      case 6:
        this.signo = 'Caballo';
        this.imagenes = 'https://static.wikia.nocookie.net/disneyypixar/images/a/a5/Maximus_KH3.png/revision/latest/smart/width/250/height/250?cb=20181116234230&path-prefix=es';
        break;
      case 7:
        this.signo = 'Cabra';
        this.imagenes = 'https://png.pngtree.com/png-clipart/20240712/original/pngtree-cartoon-goat-character-png-image_15542743.png';
        break;
      case 8:
        this.signo = 'Mono';
        this.imagenes = 'https://i.pinimg.com/236x/60/07/54/6007544eb7b1fa96444a8cf7d40f2b1d.jpg';
        break;
      case 9:
        this.signo = 'Gallo';
        this.imagenes = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5XhqwQl8FdvWA55lIxNh_h_e_coC6hojnr3xKWu1nNA&s=10';
        break;
      case 10:
        this.signo = 'Perro';
        this.imagenes = 'https://e7.pngegg.com/pngimages/635/344/png-clipart-bolt-dog-film-the-walt-disney-company-animation-bolt-head-carnivoran-paw.png';
        break;
      case 11:
        this.signo = 'Cerdo';
        this.imagenes = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQbDnSvs-xwezIbMwE1YW9NjI3BtmGJq7RxMddmIw9Pw&s=10';
        break;
    }
  }
}