import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'employees', loadComponent: () => import('./employee-list/employee-list.component').then(m => m.EmployeeListComponent)},
  // {path: 'add', loadComponent: () => import('./employee-add/employee-add.component').then(m => m.EmployeeAddComponent)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
