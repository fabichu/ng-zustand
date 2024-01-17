import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: async () =>
      (await import('./components/users/users.component')).UsersComponent
  }
];
