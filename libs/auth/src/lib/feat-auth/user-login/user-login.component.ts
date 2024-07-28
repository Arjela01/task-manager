import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import {AuthService} from "../../data-access-auth/services/auth.service";
import {ToastService} from "@task-manager/shared";

@Component({
  selector: 'lib-user-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIcon,
    MatError,
    MatProgressSpinner,
    MatFormField,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatInput,
    MatButton,
    MatLabel,
  ],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserLoginComponent {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$'
          ),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService.login(loginRequest).subscribe(
        (response) => {
          if (response) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('user', JSON.stringify(response));
            const userRole = response.role;
            if (userRole === 'admin') {
              this.toastService.showSuccess('Login was successful')
              this.router.navigateByUrl('/admin-dashboard');
            } else if (userRole === 'employee') {
              this.router.navigateByUrl('/employee-dashboard');
              this.toastService.showSuccess('Login was successful')
            } else {
              this.toastService.showError('Wrong Credentials')
            }
          }
        },
        (error) => {
          this.toastService.showError(error)
        }
      );
    }
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
