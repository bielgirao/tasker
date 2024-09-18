import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  credentials = { email: '', password: '' };

  constructor(
    private form: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.loginForm = this.form.group ({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['sessionExpired']) {
        this.snackBar.open(
          'Your session has expired. Please log in again.',
          undefined,
          {
            duration: 3000,
          }
        );
      }
    });
  }

  async onSubmit() {
    if(this.loginForm.valid) {
      const snackMsg = this.snackBar.open('Logging in...');

      console.log('Login information: ', this.loginForm.value);
      this.credentials = this.loginForm.value;

      this.authService.login(this.credentials).subscribe({
        next: async () => {
          snackMsg.dismiss();
          this.snackBar.open(
            'Logged in successfully!',
            undefined,
            {
              duration: 3000,
            }
          );
          await this.router.navigate(['/']);
        },
        error: (err) => {
          snackMsg.dismiss();
          let errorMsg: string;
          if (err.status === 401) {
            errorMsg = 'Invalid email or password.';
          } else {
            errorMsg  = 'An error occurred during login.';
          }
          this.snackBar.open(
            errorMsg,
            undefined,
            {
              duration: 3000,
            }
          );
        }
      });
    }
  }

}
