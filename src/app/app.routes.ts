import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '',
  },


  {
    path: 'escuela',
    children: [
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./escuela/lista-alumnos/lista-alumnos').then((c) => c.ListaAlumnos),
      },
    ],
  },


  {
    path: 'formulario',
    children: [
      {
        path: 'usuario',
        loadComponent: () =>
          import('./formularios/usuario/usuario').then((c) => c.Usuario),
      },
      {
        path: 'zodiaco',
        loadComponent: () =>
          import('./formularios/zodiaco/zodiaco').then((c) => c.Zodiaco),
      },
    ],
  },
  
  {
    path: '**',
    redirectTo: '',
  },
];