import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ...SHARED_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;

  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

  }

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload = this.loginForm.value;

    console.log('Login Payload', payload);

    // Call API here

    // Example:
    // this.authService.login(payload).subscribe({
    //   next: (response) => {
    //      localStorage.setItem('token', response.token);
    //      this.router.navigate(['/dashboard']);
    //   }
    // });

    this.router.navigate(['/dashboard']);
  }

}