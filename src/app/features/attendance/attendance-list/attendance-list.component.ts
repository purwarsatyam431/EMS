import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';

export interface AttendanceRecord {
  id: string;
  name: string;
  initials: string;
  department: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: 'Present' | 'Late' | 'Absent' | 'On Leave';
}

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './attendance-list.component.html',
  styleUrl: './attendance-list.component.scss'
})
export class AttendanceListComponent {
  selectedDate = new Date().toISOString().slice(0, 10);
  selectedDepartment = 'All';
  selectedStatus = 'All';

  departments = ['All', 'IT', 'HR', 'Finance', 'Marketing'];
  statuses = ['All', 'Present', 'Late', 'Absent', 'On Leave'];
  displayedColumns = ['employee', 'department', 'checkIn', 'checkOut', 'hours', 'status', 'actions'];

  records: AttendanceRecord[] = [
    {
      id: 'EMP-1024',
      name: 'Amit Kumar',
      initials: 'AK',
      department: 'IT',
      checkIn: '09:02 AM',
      checkOut: '06:11 PM',
      hours: '8h 09m',
      status: 'Present'
    },
    {
      id: 'EMP-1025',
      name: 'Priya Sharma',
      initials: 'PS',
      department: 'HR',
      checkIn: '09:28 AM',
      checkOut: '06:05 PM',
      hours: '7h 37m',
      status: 'Late'
    },
    {
      id: 'EMP-1026',
      name: 'Rahul Mehta',
      initials: 'RM',
      department: 'Finance',
      checkIn: '-',
      checkOut: '-',
      hours: '-',
      status: 'On Leave'
    },
    {
      id: 'EMP-1027',
      name: 'Sarah Khan',
      initials: 'SK',
      department: 'Marketing',
      checkIn: '08:56 AM',
      checkOut: '06:20 PM',
      hours: '8h 24m',
      status: 'Present'
    },
    {
      id: 'EMP-1028',
      name: 'John Doe',
      initials: 'JD',
      department: 'IT',
      checkIn: '-',
      checkOut: '-',
      hours: '-',
      status: 'Absent'
    },
    {
      id: 'EMP-1030',
      name: 'Karan Patel',
      initials: 'KP',
      department: 'IT',
      checkIn: '09:05 AM',
      checkOut: '05:58 PM',
      hours: '7h 53m',
      status: 'Present'
    }
  ];

  get filteredRecords(): AttendanceRecord[] {
    return this.records.filter(record => {
      const matchesDepartment =
        this.selectedDepartment === 'All' || record.department === this.selectedDepartment;
      const matchesStatus =
        this.selectedStatus === 'All' || record.status === this.selectedStatus;

      return matchesDepartment && matchesStatus;
    });
  }

  get presentCount(): number {
    return this.records.filter(record => record.status === 'Present').length;
  }

  get lateCount(): number {
    return this.records.filter(record => record.status === 'Late').length;
  }

  get leaveCount(): number {
    return this.records.filter(record => record.status === 'On Leave').length;
  }

  get absentCount(): number {
    return this.records.filter(record => record.status === 'Absent').length;
  }

  statusClass(status: AttendanceRecord['status']): string {
    if (status === 'Present') {
      return 'approved';
    }

    if (status === 'Late' || status === 'On Leave') {
      return 'pending';
    }

    return 'rejected';
  }

  markPresent(record: AttendanceRecord): void {
    record.status = 'Present';
    record.checkIn = '09:00 AM';
    record.checkOut = '-';
    record.hours = 'In progress';
  }
}
