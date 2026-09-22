import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  name: string;
  initials: string;
  type: string;
  from: string;
  to: string;
  days: number;
  reason: string;
  status: LeaveStatus;
}

@Component({
  selector: 'app-leave-list',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './leave-list.component.html',
  styleUrl: './leave-list.component.scss'
})
export class LeaveListComponent {
  selectedStatus: 'All' | LeaveStatus = 'All';
  showApplyForm = false;

  statuses: Array<'All' | LeaveStatus> = ['All', 'Pending', 'Approved', 'Rejected'];
  leaveTypes = ['Casual Leave', 'Sick Leave', 'Earned Leave', 'Work From Home'];
  displayedColumns = ['employee', 'type', 'duration', 'days', 'reason', 'status', 'actions'];

  applyForm = this.fb.group({
    name: ['', Validators.required],
    type: ['Casual Leave', Validators.required],
    from: ['', Validators.required],
    to: ['', Validators.required],
    reason: ['', Validators.required]
  });

  requests: LeaveRequest[] = [
    {
      id: 'LV-2041',
      name: 'John Doe',
      initials: 'JD',
      type: 'Casual Leave',
      from: '15 Sep 2026',
      to: '16 Sep 2026',
      days: 2,
      reason: 'Family function',
      status: 'Pending'
    },
    {
      id: 'LV-2040',
      name: 'Sarah Khan',
      initials: 'SK',
      type: 'Sick Leave',
      from: '13 Sep 2026',
      to: '13 Sep 2026',
      days: 1,
      reason: 'Fever',
      status: 'Approved'
    },
    {
      id: 'LV-2039',
      name: 'Rahul Kumar',
      initials: 'RK',
      type: 'Casual Leave',
      from: '18 Sep 2026',
      to: '19 Sep 2026',
      days: 2,
      reason: 'Personal work',
      status: 'Pending'
    },
    {
      id: 'LV-2038',
      name: 'Priya Sharma',
      initials: 'PS',
      type: 'Earned Leave',
      from: '01 Sep 2026',
      to: '05 Sep 2026',
      days: 5,
      reason: 'Vacation',
      status: 'Approved'
    },
    {
      id: 'LV-2037',
      name: 'Neha Verma',
      initials: 'NV',
      type: 'Work From Home',
      from: '10 Sep 2026',
      to: '10 Sep 2026',
      days: 1,
      reason: 'Home delivery',
      status: 'Rejected'
    }
  ];

  constructor(private fb: FormBuilder) {}

  get filteredRequests(): LeaveRequest[] {
    if (this.selectedStatus === 'All') {
      return this.requests;
    }

    return this.requests.filter(request => request.status === this.selectedStatus);
  }

  get pendingCount(): number {
    return this.requests.filter(request => request.status === 'Pending').length;
  }

  get approvedCount(): number {
    return this.requests.filter(request => request.status === 'Approved').length;
  }

  get rejectedCount(): number {
    return this.requests.filter(request => request.status === 'Rejected').length;
  }

  statusClass(status: LeaveStatus): string {
    if (status === 'Approved') {
      return 'approved';
    }

    if (status === 'Pending') {
      return 'pending';
    }

    return 'rejected';
  }

  approve(request: LeaveRequest): void {
    request.status = 'Approved';
  }

  reject(request: LeaveRequest): void {
    request.status = 'Rejected';
  }

  submitLeave(): void {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }

    const value = this.applyForm.getRawValue();
    const name = value.name ?? '';
    const initials = name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map(part => part[0].toUpperCase())
      .join('');

    this.requests = [
      {
        id: `LV-${2042 + this.requests.length}`,
        name,
        initials: initials || 'NA',
        type: value.type ?? 'Casual Leave',
        from: value.from ?? '',
        to: value.to ?? '',
        days: 1,
        reason: value.reason ?? '',
        status: 'Pending'
      },
      ...this.requests
    ];

    this.applyForm.reset({
      name: '',
      type: 'Casual Leave',
      from: '',
      to: '',
      reason: ''
    });
    this.showApplyForm = false;
    this.selectedStatus = 'Pending';
  }
}
