import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'escuela/alumnos',
  },

  {
    path: 'utl',
    children: [
      // --- RUTAS DE ALUMNOS ---
      {
        path: 'alumnos',
        loadComponent: () =>
          import('./utl/alumnos/alumnos').then((c) => c.Alumnos),
      },
      {
        path: 'alumnos/agregar',
        loadComponent: () =>
          import('./utl/alumnos/agregar/agregar').then((c) => c.Agregar),
      },
      {
        path: 'alumnos/editar/:matricula',
        loadComponent: () =>
          import('./utl/alumnos/editar/editar').then((c) => c.Editar),
      },
      {
        path: 'alumnos/eliminar/:matricula',
        loadComponent: () =>
          import('./utl/alumnos/eliminar/eliminar').then((c) => c.Eliminar),
      },

      // --- RUTAS DE MAESTROS ---
      {
        path: 'maestros',
        loadComponent: () =>
          import('./utl/maestros/maestros').then((c) => c.MaestrosComponent),
      },
      {
        path: 'maestros/agregar',
        loadComponent: () =>
          import('./utl/maestros/agregar/agregar').then((c) => c.AgregarMaestro),
      },
      {
        path: 'maestros/editar/:id',
        loadComponent: () =>
          import('./utl/maestros/editar/editar').then((c) => c.EditarMaestro),
      },
      {
        path: 'maestros/eliminar/:id',
        loadComponent: () =>
          import('./utl/maestros/eliminar/eliminar').then((c) => c.EliminarMaestro),
      },
    ]
  },
  
  {
    path: 'escuela',
    children: [
      {
        path: 'alumnos',
        loadComponent: () => import('./escuela/lista-alumnos/lista-alumnos').then((c) => c.ListaAlumnos),
      },
      {
        path: 'cinepolis',
        loadComponent: () => import('./escuela/cinepolis/cinepolis').then((c) => c.Cinepolis),
      },
      {
        path: 'verregistros',
        loadComponent: () => import('./escuela/verregistros/verregistros').then((c) => c.Verregistros),
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
    redirectTo: 'escuela/alumnos',
  },
];