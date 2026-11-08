import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProyectoapiService } from './proyectoapi.service';
import { MaestrosFilterPipe } from './maestros-filter.pipe'; // Asegúrate de ajustar la ruta si tu pipe está en otra carpeta

@Component({
  selector: 'app-maestros',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MaestrosFilterPipe],
  templateUrl: './maestros.html',
  styleUrls: ['./maestros.css']
})
export class MaestrosComponent implements OnInit {
  listFilter: string = '';
  dataSource: any = { maestros: [] };

  constructor(public maestrosUtl: ProyectoapiService) {}

  ngOnInit(): void {
    this.maestrosUtl.getMaestros().subscribe({
      next: (response: any) => {
        console.log("ESTO DEVUELVE FLASK (MAESTROS):", response);
        this.dataSource = response;
      },
      error: (error: any) => console.log('Error:', error)
    });
  }
}