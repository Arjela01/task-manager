import { Route } from '@angular/router';
import { NoAuthGuard } from '../../libs/login/src/lib/data-access-auth/services/no-auth.guard';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('@task-manager/login').then((m) => m.UserLoginComponent),
  },
  {
    path: 'employee-dashboard',
    loadComponent: () =>
      import('@task-manager/components').then((m) => m.EmployeeDashboardComponent),
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
        import('@task-manager/components').then((m) => m.AdminDashboardComponent),
  },
  {
    path: '404',
    loadComponent: () =>
      import('@task-manager/shared').then((m) => m.NotFoundComponent),
  },
  {
    path: '**',
    redirectTo: '404',
  },
];
