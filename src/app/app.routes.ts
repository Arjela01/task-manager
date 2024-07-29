import { Route } from '@angular/router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {AuthGuard, NoAuthGuard} from '@task-manager/auth';
import { TaskListComponent } from '@task-manager/task';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AdminDashboardComponent,
  StatisticsComponent,
} from '@task-manager/core';

export const appRoutes: Route[] = [
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadComponent: () =>
      import('@task-manager/auth').then((m) => m.UserLoginComponent),
  },
  {
    path: 'employee-dashboard',
    loadComponent: () =>
      import('@task-manager/core').then((m) => m.EmployeeDashboardComponent),
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'statistics', pathMatch: 'full' },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'task-list', component: TaskListComponent },
    ],
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
