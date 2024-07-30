import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
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
import { AuthService } from '../../data-access-auth/services/auth.service';
import { ToastService } from '@task-manager/shared';
import { TranslateModule } from '@ngx-translate/core';
import { TaskData } from '../../data-access-auth/mock-data/mock-data';

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
    TranslateModule,
  ],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  tasks = TaskData;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
    private cd: ChangeDetectorRef
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
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            const userRole = response.role;
            this.toastService.showSuccess('Login was successful');

            let navigateTo = '';
            if (userRole === 'admin') {
              navigateTo = '/admin-dashboard';
            } else if (userRole === 'employee') {
              navigateTo = '/employee-dashboard';
            } else {
              this.toastService.showError('Wrong Credentials');
              return;
            }

            this.router.navigate([navigateTo]).then(() => {
              this.cd.detectChanges();
            });
          }
        },
        (error) => {
          this.toastService.showError(error);
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
