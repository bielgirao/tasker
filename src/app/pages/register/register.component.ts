import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  credentials = { name: '', email: '', password: '' };

  constructor(
    private form: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    this.registerForm = this.form.group ({
      name: ['', [Validators.required, Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })
  }

  async onSubmit() {
    if(this.registerForm.valid) {
      const snackMsg = this.snackBar.open('Creating Account...');
      this.credentials = this.registerForm.value;
      this.userService.register(this.credentials).subscribe({
        next: async () => {
          snackMsg.dismiss();
          this.snackBar.open(
            'Account created successfully!',
            undefined,
            {
              duration: 3000,
              panelClass: ['success']
            }
          );
          await this.router.navigate(['/login']);
        },
        error: (err) => {
          snackMsg.dismiss();
          this.snackBar.open(
            `Error: ${err.message}`,
            undefined,
            {
              duration: 3000,
              panelClass: ['error']
            }
          );
        }
      })
    }
  }

}
