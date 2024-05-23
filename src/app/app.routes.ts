import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./notas-list/notas-list.component')
  },
  {
    path: 'papelera',
    loadComponent: () => import('./notas-papelera-list/notas-papelera-list.component')
  },
  {
    path: 'new',
    loadComponent: () => import('./notas-form/notas-form.component')
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./notas-form/notas-form.component')
  }

];
