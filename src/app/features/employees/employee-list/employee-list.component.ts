import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';

export interface Employee {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  joiningDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  searchTerm = '';
  selectedDepartment = 'All';
  selectedStatus = 'All';

  departments = ['All', 'IT', 'HR', 'Finance', 'Marketing'];
  statuses = ['All', 'Active', 'On Leave', 'Inactive'];

  displayedColumns = ['employee', 'id', 'department', 'role', 'contact', 'status', 'actions'];

  employees: Employee[] = [
    {
      id: 'EMP-1024',
      name: 'Amit Kumar',
      initials: 'AK',
      email: 'amit.kumar@ems.com',
      phone: '+91 98765 43210',
      department: 'IT',
      role: 'Software Developer',
      joiningDate: '12 Jan 2024',
      status: 'Active'
    },
    {
      id: 'EMP-1025',
      name: 'Priya Sharma',
      initials: 'PS',
      email: 'priya.sharma@ems.com',
      phone: '+91 98765 43211',
      department: 'HR',
      role: 'HR Executive',
      joiningDate: '03 Mar 2024',
      status: 'Active'
    },
    {
      id: 'EMP-1026',
      name: 'Rahul Mehta',
      initials: 'RM',
      email: 'rahul.mehta@ems.com',
      phone: '+91 98765 43212',
      department: 'Finance',
      role: 'Accountant',
      joiningDate: '18 Jun 2023',
      status: 'On Leave'
    },
    {
      id: 'EMP-1027',
      name: 'Sarah Khan',
      initials: 'SK',
      email: 'sarah.khan@ems.com',
      phone: '+91 98765 43213',
      department: 'Marketing',
      role: 'Marketing Lead',
      joiningDate: '22 Aug 2022',
      status: 'Active'
    },
    {
      id: 'EMP-1028',
      name: 'John Doe',
      initials: 'JD',
      email: 'john.doe@ems.com',
      phone: '+91 98765 43214',
      department: 'IT',
      role: 'UI Designer',
      joiningDate: '09 Feb 2025',
      status: 'Active'
    },
    {
      id: 'EMP-1029',
      name: 'Neha Verma',
      initials: 'NV',
      email: 'neha.verma@ems.com',
      phone: '+91 98765 43215',
      department: 'HR',
      role: 'Recruiter',
      joiningDate: '14 Nov 2023',
      status: 'Inactive'
    }
  ];

  get filteredEmployees(): Employee[] {
    const term = this.searchTerm.trim().toLowerCase();

    return this.employees.filter(employee => {
      const matchesSearch =
        !term ||
        employee.name.toLowerCase().includes(term) ||
        employee.id.toLowerCase().includes(term) ||
        employee.role.toLowerCase().includes(term);

      const matchesDepartment =
        this.selectedDepartment === 'All' || employee.department === this.selectedDepartment;

      const matchesStatus =
        this.selectedStatus === 'All' || employee.status === this.selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }

  get totalCount(): number {
    return this.employees.length;
  }

  get activeCount(): number {
    return this.employees.filter(employee => employee.status === 'Active').length;
  }

  get leaveCount(): number {
    return this.employees.filter(employee => employee.status === 'On Leave').length;
  }

  get inactiveCount(): number {
    return this.employees.filter(employee => employee.status === 'Inactive').length;
  }

  statusClass(status: Employee['status']): string {
    if (status === 'Active') {
      return 'approved';
    }

    if (status === 'On Leave') {
      return 'pending';
    }

    return 'rejected';
  }
}
