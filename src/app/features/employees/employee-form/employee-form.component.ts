import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent {
  departments = ['IT', 'HR', 'Finance', 'Marketing'];
  statuses = ['Active', 'On Leave', 'Inactive'];

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    employeeId: ['EMP-1030', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    department: ['IT', Validators.required],
    role: ['', Validators.required],
    joiningDate: ['', Validators.required],
    status: ['Active', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.router.navigate(['/employees']);
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
