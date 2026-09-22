import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component')
        .then(m => m.LoginComponent)
  },

  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout/main-layout.component')
        .then(m => m.MainLayoutComponent),

    children: [

      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'employees',
        loadComponent: () =>
          import('./features/employees/employee-list/employee-list.component')
            .then(m => m.EmployeeListComponent)
      },
      {
        path: 'employees/new',
        loadComponent: () =>
          import('./features/employees/employee-form/employee-form.component')
            .then(m => m.EmployeeFormComponent)
      },
      {
        path: 'attendance',
        loadComponent: () =>
          import('./features/attendance/attendance-list/attendance-list.component')
            .then(m => m.AttendanceListComponent)
      },
      {
        path: 'leaves',
        loadComponent: () =>
          import('./features/leaves/leave-list/leave-list.component')
            .then(m => m.LeaveListComponent)
      }
    ]
  }

];
